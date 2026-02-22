import { Ionicons } from "@expo/vector-icons";
import { type BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Tabs, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
//rest문법

const AnimatedTabBarButton= ({children,onPress,style,...restProps}: BottomTabBarButtonProps) =>{

  const scaleValue = useRef(new Animated.Value(1)).current;
  
  const handlePressOut= ()=> {    
    Animated.sequence([
      Animated.spring(scaleValue,{
        toValue: 1.2,
        useNativeDriver: true,
        speed:200,
      }),
      Animated.spring(scaleValue,{
        toValue: 1,
        useNativeDriver: true,
        speed:200,
      }), 
    ]).start();
  }  

  //pread
  return (
    <Pressable
      {...restProps}      
      onPress={onPress}
      onPressIn={handlePressOut}
      onPressOut={handlePressOut}
      style={[
        {flex: 1, justifyContent: "center", alignItems: "center"},
        style,
      ]}
      android_ripple={{borderless: false, radius: 0}}
    >
      <Animated.View style={{ transform: [{scale: scaleValue}] }}>
        {children}
      </Animated.View>

      
    </Pressable>
  );
};

export default function TabLayout(){

    const router = useRouter();
    const isLoggedIn = true;
    const [isLoginModalOpen,SetIsLoginModalOpen] = useState(false);

    const openLoginModal = ()=>{
      console.log("Modal open!"); // 터미널에서 확인
      SetIsLoginModalOpen(true);
    }

    const closeLoginModal = ()=>{
      console.log("닫기 버튼 눌림!"); // 터미널에서 확인
      SetIsLoginModalOpen(false);
    }


    //backBehavior="history"  뒤로가기 버튼을 누르면 아래바에서 차례차례로 뒤로간다
    //tabBarButton: (props) => <AnimatedTabBarButton{...props} />  아래버튼을 커져다 작아져다하는 기능
    return (
      <>
        <Tabs
          backBehavior="history" 
          screenOptions={{
            headerShown: false,
            tabBarButton: (props) => <AnimatedTabBarButton{...props} />             
          }}
        >
        <Tabs.Screen name="(home)" 
          options={{
            tabBarLabel:()=> null,
            tabBarIcon: ({ focused }) => <Ionicons name="home" size={28} color={focused ? "black" : "gray"} />,
          }}
        />
        <Tabs.Screen name="search" 
          options={{
            tabBarLabel:()=> null,
            tabBarIcon: ({ focused }) => <Ionicons name="search" size={28} color={focused ? "black" : "gray"} />,
          }}
        />
        <Tabs.Screen name="add" 
          listeners={{
            tabPress: (e) => {
              e.preventDefault()
              if(isLoggedIn){
                router.navigate("/modal")
              } else{
                openLoginModal();
              }
            }                    
          }}
          options={{
            tabBarLabel:()=> null,
            tabBarIcon: ({ focused }) => <Ionicons name="add" size={28} color={focused ? "black" : "gray"} />,
          }}
        />
        <Tabs.Screen name="activity" 
          listeners={{
            tabPress: (e) => {              
              if(!isLoggedIn){
                e.preventDefault()                
                openLoginModal();
              }
            }                    
          }}
          options={{
            tabBarLabel:()=> null,
            tabBarIcon: ({ focused }) => <Ionicons name="heart-outline" size={28} color={focused ? "black" : "gray"} />
          }}
        />
        <Tabs.Screen name="[username]"
          listeners={{
            tabPress: (e) => {              
              if(!isLoggedIn){
                e.preventDefault()                
                openLoginModal();
              }
            }                    
          }}
          options={{
            tabBarLabel:()=> null, //하단 버튼에 이름을 없애는것
            tabBarIcon: ({ focused }) => <Ionicons name="person-outline" size={28} color={focused ? "black" : "gray"} />,
          }}
        />

        <Tabs.Screen name="(post)/[username]/post/[postID]"
          options={{
            href: null,
          }}
        />
        </Tabs>
        
        <Modal visible ={isLoginModalOpen} >  {/* 로그인 모달의 표시 여부 제어 (true면 보임) */}
          <View
            style={{flex: 1,justifyContent: "flex-end",backgroundColor: "rgba(0,0,0,0.5)", }}
          >
          
            <View 
              style={{backgroundColor: "white", padding: 20 }}
            >
              <Text>Login Modal</Text>          
              <TouchableOpacity onPress={closeLoginModal}>
                  <Ionicons name="close" size={24} color="#555" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
    )
};