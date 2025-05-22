import { collection, query, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase-config"

export const fetchAllStudents = async () => {
  const q = query(collection(db, "students"));
  const querySnapshot = await getDocs(q);
  const students = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    students.push({
      ...doc.data(),
      id: doc.id
    })
  });
  return students;
}

export const fetchAllCourses = async () => {
  const q = query(collection(db, "courses"));
  const querySnapshot = await getDocs(q);
  const courses = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    courses.push({
      ...doc.data(),
      id: doc.id
    })
  });
  return courses;
}

export const addStudent = async (student) => {
  const docRef = await addDoc(collection(db, "students"), {
    ...student,
  })
  return docRef;
}

export const deleteStudent = async (studentId) => {
  await deleteDoc(doc(db, "students", studentId))
}