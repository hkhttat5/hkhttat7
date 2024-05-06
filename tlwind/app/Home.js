
import React, { useState, useRef, useEffect } from 'react';
import { Text, Modal,Button, Pressable, View, TextInput, Image, ScrollView, FlatList,Alert } from 'react-native';
import tw from 'twrnc';
import { FontAwesome, AntDesign,Feather ,Ionicons , FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import * as Print from 'expo-print';

import { Link } from 'expo-router';
const data = [
  { "id": "1", "name": "Article One", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "2", "name": "Article Two", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "3", "name": "Article Three", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "4", "name": "Article Four", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "5", "name": "Article Five", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "6", "name": "Article Six", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "7", "name": "Article Seven", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "8", "name": "Article Eight", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "9", "name": "Article Nine", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "10", "name": "Article Ten", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "11", "name": "Article Eleven", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "12", "name": "Article Twelve", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "13", "name": "Article Thirteen", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "14", "name": "Article Fourteen", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "15", "name": "Article Fifteen", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "16", "name": "Article Sixteen", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "17", "name": "Article Seventeen", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "18", "name": "Article Eighteen", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "19", "name": "Article Nineteen", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
  { "id": "20", "name": "Article Twenty", "price": (Math.random()).toFixed(3), "imageUrl": require('./ass/1.png'), "onStock": true },
];
const HoverIcon = ({ IconComponent, iconName, baseSize, color, style }) => {
  const [iconSize, setIconSize] = useState(baseSize);

  const increaseSize = () => setIconSize(baseSize * 1.2); // Increase size by 20%
  const decreaseSize = () => setIconSize(baseSize);

  return (
    <View style={style} onMouseEnter={()=>{increaseSize(),console.log("enter .....")}} onMouseLeave={decreaseSize}>
      <IconComponent name={iconName} size={iconSize} color={color} />
    </View>
  );
};
const Casher = ({ onPress }) => {
  const [Cart, SetCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [Tp, setTp] = useState(0);
  const flatListRef = useRef();
  const [searchId, setSearchId] = useState('');
  const [dataX, setdataX] = useState(data);
  const inputRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalXVisible, setModalXVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const printHTML = async () => {
    await Print.printAsync({
      html: `<h1 style="color: red;">Hello World</h1><p>This is a sample HTML to print.</p>`
    });
  };
  const toggleModal = () => {
    console.log(Object.keys(Cart).length)
    if ((Object.keys(Cart).length) !==0 ){
      setModalVisible(!modalVisible);
      console.log("not empty")
  }
  else{
      setModalXVisible(!modalXVisible);
      console.log("empty")
  }
    
  };

  const handleLogin = () => {
    console.log("Username: ", username, "Password: ", password);
    // Here you can add your logic to handle the login or any other action

    toggleModal();
    inputRef.current.focus();
  };
  useEffect(() => {
    // Focus the input element if it exists
    if (inputRef.current && (modalVisible===false)) {
      inputRef.current.focus();
    }
  } , [inputRef,Cart]);
  const totalPrice = (items) => {
    const total = items.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      console.log(itemTotal); // طباعة سعر كل عنصر مضروبًا في الكمية
      return total + itemTotal;
    }, 0);
    const roundedTotal = (Math.round((total + Number.EPSILON) * 1000) / 1000).toFixed(3);
    setTp(roundedTotal); // تحديث السعر الإجمالي في الحالة
    console.log(`السعر الإجمالي للسلة هو ${roundedTotal}`); // طباعة السعر الإجمالي
    inputRef.current.focus();
};

  useEffect(() => {
    console.log('Cart updated:', Cart);

    // Example: Calculate total price or items count
    totalPrice(Cart)
    const itemCount = Cart.reduce((total, item) => total + item.quantity, 0);
    console.log('Total items in cart:', itemCount);

    // If needed, update local storage or perform other side effects here
  }, [Cart]);
  const logItemById = (dataArray, searchId) => {
    dataArray.forEach(item => {
      if (item.id === searchId) {
        console.log(item);
        addToCart(item)
      }
    });
  }
  const addToCart = (item) => {
    SetCart(currentCart => {
      const index = currentCart.findIndex(cartItem => cartItem.id === item.id);
      if (index > -1) {
        const newCart = [...currentCart];
        newCart[index].quantity += 1;
        return newCart;
      } else {
        return [...currentCart, { ...item, quantity: 1 }];
      }
    });

  };

  const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const ItemCard = ({ item }) => (

    <Pressable onPress={() => addToCart(item)} style={tw`w-[31%] h-[200px] flex-col bg-[#f8fafc] p-2 m-2 rounded-lg shadow-md`}>
      <Image source={item.imageUrl} style={tw`h-2.1/3 w-full rounded`} />
      <View style={tw`w-[100%] pt-2 flex-row justify-between`}>
        <View>
            <Text selectable={false} style={[tw`text-md font-bold`, { userSelect: 'none' }]}>{item.name}</Text>
            <Text selectable={false} style={[tw`text-md font-bold`, { userSelect: 'none' }]}>{`${item.price} DT`}</Text>
        </View>
        <View style={tw`pt-2 `}><MaterialIcons name="brightness-1" size={24} color="red" /></View>
      </View>
    </Pressable>
  );
  const CartItemCard = ({ item }) => {

    const incrementQty = () => {

      SetCart(currentCart => currentCart.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));

      totalPrice(Cart)
    };

    const decrementQty = () => {

      SetCart(currentCart => {
        const cartWithUpdatedQuantities = currentCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: Math.max(0, cartItem.quantity - 1) } : cartItem
        );

        totalPrice(Cart)
        const cartWithoutZeroQuantityItems = cartWithUpdatedQuantities.filter(cartItem => cartItem.quantity > 0);
        return cartWithoutZeroQuantityItems;
      });
    };

    return (
      <View style={tw`flex-row justify-between items-center p-2 border-b bg-gray-200 border-gray-200 shadow-md rounded-lg m-2`}>
        <View style={tw`flex-3 ml-2`}>
          <Text selectable={false} style={tw`text-lg font-bold`}>{item.name}</Text>
          <Text selectable={false} style={tw`text-lg`}>{`${(Math.round(((item.price * item.quantity) + Number.EPSILON) * 1000) / 1000).toFixed(3)} DT`}</Text>
        </View>
        <View style={tw`flex-1 flex-row items-center justify-end`}>
          <Pressable onPress={decrementQty} style={tw`p-2 bg-red-500 rounded-md shadow-md w-11 h-11 text-center justify-center items-center`}>
            <AntDesign name="minus" size={24} color="white" />
          </Pressable>
          <View style={tw`w-11 h-11 bg-[#cbd5e1] p-2 rounded-md shadow-md mx-2 text-center justify-center items-center`}><Text selectable={false} style={tw`text-lg mx-2 `}>{item.quantity > 0 ? `${item.quantity}` : ''}</Text></View>
          <Pressable onPress={incrementQty} style={tw`p-2 bg-blue-500 rounded-md shadow-md w-11 h-11 text-center justify-center items-center `}>
            <AntDesign name="plus" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    );
  };
  const CartItemCardX = ({ item }) => {


    return (
      <View style={tw` flex-row justify-evenly item-center p-2 border-b border-gray-200 mx-6`}>
        <Text selectable={false} style={tw`text-lg font-bold flex-2`}>{item.name}</Text>
        <View style={tw`flex-row flex-1 gap-[10px]`}>
          <Text selectable={false} style={tw`text-lg flex-2 text-center`}>{`${(Math.round(((item.price * item.quantity) + Number.EPSILON) * 1000) / 1000).toFixed(3)} DT`}</Text>
          <Text selectable={false} style={tw`text-lg flex-1 text-center`}>{item.quantity > 0 ? `${item.quantity}` : ''}</Text>
        </View>
      </View>
    );
  };

  return (
    <View name="all screen " style={tw`flex-1 flex-row  justify-center bg-[#cbd5e1] `}>
      <View style={tw`h-[90px] w-[90px] bg-emerald-400  rounded-full self-center justify-center items-center`}>
        <AntDesign name="doubleright" size={70} color="black" />
      </View>
      <View name="item_list" style={tw`w-[60%]  items-center rounded-md flex-col `}>
        <View name="serch_bar" style={tw`rounded-7 w-[90%] h-15 bg-zinc-50 m-5 flex-row justify-between `}>
          <TextInput
            style={tw`pl-10 w-[100%] py-5 h-15 rounded-10 text-lg bg-[#fafafa] border-[#2dd4bf] `}
            inlineImageLeft='search_icon'
            placeholder="Enter item code..."
            placeholderTextColor="#888"
            value={searchId}
            onChangeText={setSearchId}
            inputMode="numeric"
            autoFocus
            ref={inputRef}
            onSubmitEditing={() => { logItemById(data, searchId), setSearchId('') }}
            left={<FontAwesome name="search" size={24} color="black" />}
          />
        </View>
        <View name="item tableu" style={tw`w-[90%] h-[80%] my-3  flex-col content-center`}>
          <FlatList
            data={dataX}
            renderItem={({ item }) => <ItemCard item={item} />}
            keyExtractor={item => item.id}
            numColumns={3} // Adjust number of columns here
            showsVerticalScrollIndicator={false} // Hides the vertical scrollbar
            style={[tw` flex-1`]}

          />
        </View>
      </View>
      <View name="carte" style={tw`w-[30%] m-3 bg-[#fafafa] rounded-md flex-col justify-end shadow-sm`}>
        <View style={tw`mx-5 flex-row justify-between p-2 border-b border-gray-200`}>
          <Text selectable={false} style={tw`text-lg font-bold flex-2`}>name</Text>

          <Text selectable={false} style={tw`text-lg flex-1`}>quantity</Text>
        </View>
        <View style={tw`my-1 h-[66%]`}>
          <FlatList
            data={Cart}
            renderItem={({ item }) => <CartItemCard item={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ref={flatListRef}
            onContentSizeChange={() => {
              if (Object.keys(Cart).length > 0) {
                flatListRef.current.scrollToEnd({ animated: true });
              }
            }}
          />
        </View>

        <View style={tw`flex-1 justify-end	`}>
          <View style={tw`mt-5 flex-row justify-between mx-5 mb-6`}>
            <Text selectable={false} style={tw`text-7`}>Total</Text>
            <Text selectable={false} style={tw`text-7 text-[#22c55e]`} >{Tp} Dt</Text>
          </View>
          <View style={tw`flex-row`}>
            <Pressable
              onPress={toggleModal}
              style={({ pressed }) => [
                tw`p-3 rounded-lg shadow-md mx-5 mb-5 flex-1`,
                pressed ? tw`bg-red-700` : tw`bg-blue-500`,
              ]}
            >
              <Text selectable={false} style={[tw`text-white text-center font-bold text-lg `, { userSelect: 'none' }]}>Verify</Text>

            </Pressable>
            <Pressable
              onPress={()=>{SetCart([])}}
              style={({ pressed }) => [
                tw`p-3 rounded-lg shadow-md mx-5 mb-5 flex-1`,
                pressed ? tw`bg-red-700` : tw`bg-red-500`,
              ]}
            >
              <Text selectable={false} style={[tw`text-white text-center font-bold text-lg`, { userSelect: 'none' }]}>Clear</Text>
            </Pressable>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModal}
          >
            <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
              
              <View style={tw`w-[30%] h-[70%] bg-[#fafafa] rounded-md shadow-sm justify-center `}>
                <View style={tw`bg-[#fafafa] justify-end self-end`} >
                  <Pressable style={tw` mx-4`} onPress={()=>{setModalVisible(false)}}  ><Feather name="x-circle" size={32} color="red" /></Pressable>
                </View>
                <View style={tw` flex-row justify-evenly p-2 border-b border-gray-200 mx-6`}>
                  <Text selectable={false} style={tw`text-lg font-bold flex-2`}>name</Text>
                  <View style={tw`flex-row flex-1 gap-[10px]`}>
                    <Text selectable={false} style={tw`text-lg font-bold flex-2`}>price</Text>
                    <Text selectable={false} style={tw`text-lg font-bold flex-1`}>Qty</Text>
                  </View>
                </View>
                <View style={tw`my-1 h-[66%]`}>
                  <FlatList
                    data={Cart}
                    renderItem={({ item }) => <CartItemCardX item={item} />}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}

                  />
                  <View style={tw`flex-row`}>
                    <Pressable
                      onPress={()=>{SetCart([]);toggleModal()}}
                      style={({ pressed }) => [
                        tw`p-3 rounded-lg shadow-md mx-5 mb-5 flex-1`,
                        pressed ? tw`bg-red-700` : tw`bg-blue-500`,
                      ]}
                    >
                      <Text selectable={false} style={[tw`text-white text-center font-bold text-lg shadow-lg shadow-indigo-500/50`, { userSelect: 'none' }]}>Print</Text>

                    </Pressable>
                    <Pressable
                      onPress={()=>{SetCart([]);toggleModal()}}
                      style={({ pressed }) => [
                        tw`p-3 rounded-lg shadow-md mx-5 mb-5 flex-1`,
                        pressed ? tw`bg-red-700` : tw`bg-[#84cc16]`,
                      ]}
                    >
                      <Text selectable={false} style={[tw`text-white text-center font-bold text-lg shadow-lg shadow-indigo-500/50`, { userSelect: 'none' }]}>Save</Text>
                    </Pressable>
                    <Pressable
                      onPress={()=>{SetCart([]);toggleModal()}}
                      style={({ pressed }) => [
                        tw`p-3 rounded-lg shadow-md mx-5 mb-5 flex-1`,
                        pressed ? tw`bg-red-700` : tw`bg-red-500`,
                      ]}
                    >
                      <Text selectable={false} style={[tw`text-white text-center font-bold text-lg shadow-lg shadow-indigo-500/50`, { userSelect: 'none' }]}>Routour</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalXVisible}
              onRequestClose={toggleModal}>
          
            <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>  
              <View style={tw`w-[20%] h-[30%] bg-[#fafafa] rounded-md shadow-sm justify-center justify-evenly items-center`}>
                <Text style={[tw`text-red text-center font-bold text-3xl`, { userSelect: 'none' }]}>Cart empty</Text>
                <Pressable 
                  style={({ pressed }) => [
                    tw`p-3 rounded-lg shadow-md mx-5 mb-5 flex-row  justify-center items-center`,
                    pressed ? tw`bg-[#e11d48]` : tw`bg-[#84cc16]`,
                  ]} 
                  onPress={() => {
                      setModalXVisible(false);
                  }}
                >
                  <MaterialIcons name="verified" size={40} color="black" />
                  <Text style={[tw`px-4 text-red text-center font-bold text-3xl`, { userSelect: 'none' }]}>OK</Text>
                </Pressable>
              </View>
            </View>
            
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default Casher;
