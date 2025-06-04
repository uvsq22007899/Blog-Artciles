import { initializeApp } from 'firebase/app'
import { getFirestore,collection,addDoc,query,orderBy,onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAlb_4VKqRwlTHNm-c0lYve-uTFa1x9ATA",
  authDomain: "stylo-97e03.firebaseapp.com",
  projectId: "stylo-97e03",
  storageBucket: "stylo-97e03.firebasestorage.app",
  messagingSenderId: "341959336398",
  appId: "1:341959336398:web:af47cf9c3fc2c278520b9f",
  measurementId: "G-JSMGNMQ9CK"
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const getArticles = callback => {
  const q = query(collection(db, 'articles'), orderBy('title', 'asc'))
  onSnapshot(q, snapshot => {
    let articles = []
    snapshot.forEach(doc => {
      articles.push({ id: doc.id, ...doc.data() })
    })
    callback(articles)
  })
}

export const addArticle = article => {
  addDoc(collection(db, 'articles'), article)
}

export const updateArticle = article => {
  updateDoc(doc(db, 'articles', article.id), article)
}

export const deleteArticle = article => {
  deleteDoc(doc(db, 'articles', article.id))
}


