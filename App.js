import React, { useEffect, useState } from 'react';
import {
View,
Text,
StyleSheet,
ScrollView,
TouchableOpacity,
SafeAreaView,
TextInput,
Modal,
Alert
} from 'react-native';

import { db } from './firebase';

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from 'firebase/firestore';

export default function App() {

const [books, setBooks] = useState([]);

const [showModal, setShowModal] = useState(false);

const [title, setTitle] = useState('');
const [author, setAuthor] = useState('');
const [progress, setProgress] = useState('');
const [mood, setMood] = useState('');

const booksCollection = collection(db, 'books');

useEffect(() => {
fetchBooks();
}, []);

const fetchBooks = async () => {

const data = await getDocs(booksCollection);

setBooks(
data.docs.map((doc) => ({
...doc.data(),
id: doc.id
}))
);

};

const addBook = async () => {

if (!title || !author) {
Alert.alert('Please enter title and author');
return;
}

await addDoc(booksCollection, {
title,
author,
progress,
mood
});

setTitle('');
setAuthor('');
setProgress('');
setMood('');

setShowModal(false);

fetchBooks();
};

const removeBook = async (id) => {

await deleteDoc(doc(db, 'books', id));

fetchBooks();
};

return ( <SafeAreaView style={styles.container}>

<ScrollView showsVerticalScrollIndicator={false}>

<View style={styles.header}>
<Text style={styles.logo}>🌸 shelf therapy</Text>

<Text style={styles.tagline}>
busy dealing with non fictional feelings for fictional characters
</Text>
</View>

<View style={styles.heroCard}>

<Text style={styles.heroTitle}>
your cozy reading sanctuary ✨
</Text>

<TouchableOpacity
style={styles.addButton}
onPress={() => setShowModal(true)}

>

<Text style={styles.addButtonText}>
+ add book
</Text>
</TouchableOpacity>

</View>

<View style={styles.section}>

<Text style={styles.sectionTitle}>
📚 your bookshelf
</Text>

{books.map((book) => (

<View key={book.id} style={styles.bookCard}>

<View style={{ flex: 1 }}>

<Text style={styles.bookTitle}>
{book.title}
</Text>

<Text style={styles.bookAuthor}>
{book.author}
</Text>

<View style={styles.progressBar}>
<View
style={[
styles.progressFill,
{
width: `${book.progress || 0}%`
}
]}
/>
</View>

<Text style={styles.progressText}>
{book.progress}% complete
</Text>

<View style={styles.moodTag}>
<Text style={styles.moodText}>
{book.mood}
</Text>
</View>

</View>

<TouchableOpacity
onPress={() => removeBook(book.id)}

>

<Text style={styles.deleteText}>
✕
</Text>
</TouchableOpacity>

</View>

))}

</View>

<View style={styles.section}>

<Text style={styles.sectionTitle}>
📊 reading stats
</Text>

<View style={styles.statsContainer}>

<View style={styles.statCard}>
<Text style={styles.statNumber}>
{books.length}
</Text>

<Text style={styles.statLabel}>
books tracked
</Text>
</View>

<View style={styles.statCard}>
<Text style={styles.statNumber}>
∞
</Text>

<Text style={styles.statLabel}>
fictional breakdowns
</Text>
</View>

<View style={styles.statCard}>
<Text style={styles.statNumber}>
24/7
</Text>

<Text style={styles.statLabel}>
yearning
</Text>
</View>

</View>

</View>

<View style={styles.footer}>
<Text style={styles.footerText}>
made for readers who feel too much 💌
</Text>
</View>

</ScrollView>

<Modal visible={showModal} animationType="slide">

<View style={styles.modalContainer}>

<Text style={styles.modalTitle}>
new fictional obsession 📚
</Text>

<TextInput
placeholder="book title"
style={styles.input}
value={title}
onChangeText={setTitle}
/>

<TextInput
placeholder="author"
style={styles.input}
value={author}
onChangeText={setAuthor}
/>

<TextInput
placeholder="progress %"
style={styles.input}
value={progress}
onChangeText={setProgress}
keyboardType="numeric"
/>

<TextInput
placeholder="reading mood"
style={styles.input}
value={mood}
onChangeText={setMood}
/>

<TouchableOpacity
style={styles.saveButton}
onPress={addBook}

>

<Text style={styles.saveButtonText}>
save book
</Text>
</TouchableOpacity>

<TouchableOpacity
onPress={() => setShowModal(false)}

>

<Text style={styles.cancelText}>
cancel
</Text>
</TouchableOpacity>

</View>

</Modal>

</SafeAreaView>
);
}

const styles = StyleSheet.create({

container: {
flex: 1,
backgroundColor: '#FFF8F7'
},

header: {
padding: 25,
paddingTop: 45,
alignItems: 'center'
},

logo: {
fontSize: 34,
fontWeight: 'bold',
color: '#C97C8A'
},

tagline: {
marginTop: 10,
fontSize: 14,
textAlign: 'center',
color: '#9C7077',
fontStyle: 'italic'
},

heroCard: {
backgroundColor: '#FFECEF',
margin: 20,
padding: 25,
borderRadius: 30
},

heroTitle: {
fontSize: 20,
fontWeight: 'bold',
color: '#7B4F58',
marginBottom: 20
},

addButton: {
backgroundColor: '#D98A9A',
padding: 15,
borderRadius: 20,
alignItems: 'center'
},

addButtonText: {
color: 'white',
fontWeight: 'bold'
},

section: {
paddingHorizontal: 20,
marginTop: 15
},

sectionTitle: {
fontSize: 22,
fontWeight: 'bold',
color: '#7B4F58',
marginBottom: 16
},

bookCard: {
backgroundColor: '#FFF1F3',
padding: 18,
borderRadius: 24,
marginBottom: 15,
flexDirection: 'row'
},

bookTitle: {
fontSize: 20,
fontWeight: 'bold',
color: '#5C4046'
},

bookAuthor: {
marginTop: 4,
color: '#9B6B75'
},

progressBar: {
height: 10,
backgroundColor: '#F3D3DB',
borderRadius: 10,
marginTop: 14,
overflow: 'hidden'
},

progressFill: {
height: '100%',
backgroundColor: '#D98A9A'
},

progressText: {
marginTop: 8,
color: '#8C5E67'
},

moodTag: {
marginTop: 12,
backgroundColor: '#FFD8E1',
alignSelf: 'flex-start',
paddingHorizontal: 14,
paddingVertical: 8,
borderRadius: 20
},

moodText: {
color: '#A14E62'
},

deleteText: {
fontSize: 20,
color: '#A45C68',
paddingLeft: 15
},

statsContainer: {
flexDirection: 'row',
justifyContent: 'space-between'
},

statCard: {
backgroundColor: '#FFE8EE',
width: '31%',
padding: 18,
borderRadius: 20,
alignItems: 'center'
},

statNumber: {
fontSize: 24,
fontWeight: 'bold',
color: '#A65467'
},

statLabel: {
marginTop: 8,
textAlign: 'center',
fontSize: 12,
color: '#8D5B65'
},

footer: {
padding: 40,
alignItems: 'center'
},

footerText: {
fontStyle: 'italic',
color: '#9C7077'
},

modalContainer: {
flex: 1,
justifyContent: 'center',
padding: 25,
backgroundColor: '#FFF8F7'
},

modalTitle: {
fontSize: 28,
fontWeight: 'bold',
marginBottom: 30,
color: '#7B4F58'
},

input: {
backgroundColor: 'white',
padding: 16,
borderRadius: 18,
marginBottom: 15
},

saveButton: {
backgroundColor: '#D98A9A',
padding: 16,
borderRadius: 20,
alignItems: 'center',
marginTop: 10
},

saveButtonText: {
color: 'white',
fontWeight: 'bold'
},

cancelText: {
marginTop: 20,
textAlign: 'center',
color: '#9B6B75'
}

});
