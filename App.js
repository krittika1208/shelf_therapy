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
