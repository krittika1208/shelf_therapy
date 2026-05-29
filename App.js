import React, { useState, useEffect } from 'react';
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

export default function App() {

const [books, setBooks] = useState([
{
id: 1,
title: 'Fourth Wing',
author: 'Rebecca Yarros',
progress: '78',
mood: 'emotionally damaged'
}
]);

const [showModal, setShowModal] = useState(false);

const [title, setTitle] = useState('');
const [author, setAuthor] = useState('');
const [progress, setProgress] = useState('');
const [mood, setMood] = useState('');

const quotes = [
'You were the one thing in this world I wanted.',
'Some stories stay with you forever.',
'Perhaps we were friends first and lovers second.'
];

const addBook = () => {

if (!title || !author) {
Alert.alert('Please fill title and author');
return;
}

const newBook = {
id: Date.now(),
title,
author,
progress,
mood
};

setBooks([...books, newBook]);

setTitle('');
setAuthor('');
setProgress('');
setMood('');

setShowModal(false);
};

const deleteBook = (id) => {
setBooks(books.filter(book => book.id !== id));
};

const totalBooks = books.length;

return ( <SafeAreaView style={styles.container}>

<ScrollView showsVerticalScrollIndicator={false}>

<View style={styles.header}>
<Text style={styles.logo}>🌸 shelf therapy</Text>

<Text style={styles.tagline}>
busy dealing with non fictional feelings for fictional characters
</Text>
</View>

<View style={styles.heroCard}>
<Text style={styles.heroTitle}>currently reading</Text>

<Text style={styles.currentText}>
tracking fictional heartbreaks since forever ✨
</Text>

<TouchableOpacity
style={styles.addButton}
onPress={() => setShowModal(true)}

>

<Text style={styles.addButtonText}>+ add new book</Text> </TouchableOpacity> </View>

<View style={styles.section}>
<Text style={styles.sectionTitle}>📚 your bookshelf</Text>

{books.map((book) => ( <View key={book.id} style={styles.bookCard}>

<View style={{ flex: 1 }}>

<Text style={styles.bookTitle}>{book.title}</Text>

<Text style={styles.bookAuthor}>
{book.author}
</Text>

<View style={styles.progressBar}>
<View
style={[
styles.progressFill,
{ width: `${book.progress || 0}%` }
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
onPress={() => deleteBook(book.id)}

>

<Text style={styles.deleteText}>✕</Text> </TouchableOpacity>

</View>
))}
</View>

<View style={styles.section}>
<Text style={styles.sectionTitle}>
💭 books that felt like...
</Text>

<View style={styles.feelingsContainer}>

<View style={styles.feelingCard}>
<Text style={styles.feelingText}>rain at 2am</Text>
</View>

<View style={styles.feelingCard}>
<Text style={styles.feelingText}>first love</Text>
</View>

<View style={styles.feelingCard}>
<Text style={styles.feelingText}>grief</Text>
</View>

<View style={styles.feelingCard}>
<Text style={styles.feelingText}>coming home</Text>
</View>

</View>
</View>

<View style={styles.section}>
<Text style={styles.sectionTitle}>
✍ favorite quotes
</Text>

{quotes.map((quote, index) => ( <View key={index} style={styles.quoteCard}> <Text style={styles.quoteText}>
“{quote}” </Text> </View>
))} </View>

<View style={styles.section}>
<Text style={styles.sectionTitle}>
📊 reading stats
</Text>

<View style={styles.statsContainer}>

<View style={styles.statCard}>
<Text style={styles.statNumber}>
{totalBooks}
</Text>

<Text style={styles.statLabel}>
books tracked
</Text>
</View>

<View style={styles.statCard}>
<Text style={styles.statNumber}>
12k
</Text>

<Text style={styles.statLabel}>
pages survived
</Text>
</View>

<View style={styles.statCard}>
<Text style={styles.statNumber}>
87%
</Text>

<Text style={styles.statLabel}>
emotional damage
</Text>
</View>

</View>
</View>

<View style={styles.section}>
<Text style={styles.sectionTitle}>
🌧 atmosphere modes
</Text>

<View style={styles.modeContainer}>

<View style={styles.modeCard}>
<Text style={styles.modeEmoji}>☕</Text>
<Text style={styles.modeText}>rainy café</Text>
</View>

<View style={styles.modeCard}>
<Text style={styles.modeEmoji}>🕯</Text>
<Text style={styles.modeText}>candlelight</Text>
</View>

<View style={styles.modeCard}>
<Text style={styles.modeEmoji}>📖</Text>
<Text style={styles.modeText}>dark academia</Text>
</View>

<View style={styles.modeCard}>
<Text style={styles.modeEmoji}>❄</Text>
<Text style={styles.modeText}>snowy cabin</Text>
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
add a new fictional obsession 📚
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
color: '#7B4F58'
},

currentText: {
marginTop: 10,
color: '#9B6B75'
},

addButton: {
marginTop: 20,
backgroundColor: '#D98A9A',
padding: 14,
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

feelingsContainer: {
flexDirection: 'row',
flexWrap: 'wrap'
},

feelingCard: {
backgroundColor: '#FFF0E8',
padding: 14,
borderRadius: 20,
marginRight: 10,
marginBottom: 10
},

feelingText: {
color: '#8B5E5E'
},

quoteCard: {
backgroundColor: '#FFF9FB',
padding: 20,
borderRadius: 24,
marginBottom: 14,
borderLeftWidth: 5,
borderLeftColor: '#E8A5B5'
},

quoteText: {
fontStyle: 'italic',
lineHeight: 24,
color: '#6B4A52'
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

modeContainer: {
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'space-between'
},

modeCard: {
backgroundColor: '#FFF4F6',
width: '48%',
padding: 20,
borderRadius: 24,
marginBottom: 14,
alignItems: 'center'
},

modeEmoji: {
fontSize: 28
},

modeText: {
marginTop: 10,
color: '#7B4F58',
fontWeight: '600'
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
