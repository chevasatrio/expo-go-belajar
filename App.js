import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

// --- (1) DATA DUMMY (Data bohongan) ---
// Nanti, data ini akan kamu dapatkan dari server/database (API)
const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    name: 'Smartphone Pro X',
    price: 12000000,
    imageUrl: 'https://placehold.co/120', // Ganti dengan URL gambar aslimu
  },
  {
    id: 'p2',
    name: 'Laptop Gaming 15"',
    price: 25000000,
    imageUrl: 'https://placehold.co/120',
  },
  {
    id: 'p3',
    name: 'Wireless Earbuds v5',
    price: 1500000,
    imageUrl: 'https://placehold.co/120',
  },
  {
    id: 'p4',
    name: 'Smartwatch 2 Series',
    price: 3500000,
    imageUrl: 'https://placehold.co/120',
  },
  {
    id: 'p5',
    name: 'Coffee Maker Otomatis',
    price: 800000,
    imageUrl: 'https://placehold.co/120',
  },
];

// --- (2) KOMPONEN UNTUK SATU KARTU PRODUK ---
// Ini adalah komponen untuk menampilkan SATU item produk
// Menerima 'item' sebagai prop (data produk)
const ProductCard = ({ item }) => {
  
  // Fungsi untuk format harga ke Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    // TouchableOpacity membuat kartu bisa diklik
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={() => alert('Kamu klik produk: ' + item.name)}
    >
      {/* Gambar Produk */}
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />

      {/* Info Produk (Nama & Harga) */}
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardPrice}>{formatRupiah(item.price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

// --- (3) KOMPONEN UTAMA APLIKASI ---
// Ini adalah layar utama aplikasi kita
const App = () => {
  // Menyimpan daftar produk ke dalam state
  const [products, setProducts] = useState(DUMMY_PRODUCTS);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Judul Halaman */}
      <Text style={styles.headerTitle}>Toko Online Kita</Text>

      {/* (R) READ: Menampilkan daftar produk menggunakan FlatList */}
      <FlatList
        data={products} // Sumber data
        renderItem={({ item }) => <ProductCard item={item} />} // Komponen untuk render tiap item
        keyExtractor={(item) => item.id} // Kunci unik untuk tiap item
        numColumns={2} // Tampilan 2 kolom (grid)
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

// --- (4) STYLING (CSS di React Native) ---
// Ini adalah cara standar styling di React Native
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Warna latar belakang abu-abu muda
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 10, // Jarak di kiri dan kanan list
  },
  // --- Style untuk ProductCard ---
  cardContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: '#ffffff', // Warna kartu putih
    borderRadius: 10,
    overflow: 'hidden', // Penting agar gambar tidak keluar dari border radius
    elevation: 3, // Efek bayangan untuk Android
    shadowColor: '#000', // Efek bayangan untuk iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover', // Agar gambar pas
  },
  cardInfo: {
    padding: 12,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 5,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e74c3c', // Warna harga (merah)
  },
});

export default App;