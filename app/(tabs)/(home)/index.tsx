import SideMenu from "@/components/SideMenu";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { usePathname, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Dimensions, Image, PixelRatio, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; //노치, 홈 버튼, 상태바 등에 콘텐츠가 가려지지 않도록 여백을 알려줍니다.
import { AuthContext } from "../../_layout";

export default function Index() {
  const router = useRouter();
  const Pathname = usePathname();
  const insets = useSafeAreaInsets();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const {user} = useContext(AuthContext);
  const isLoggedIn = !!user;  

  //console.log("Pathname",usePathname)
  //console.log("insets",insets);

  const {width,height} = Dimensions.get("window") //화
  console.log(`화면 너비: ${width}dp , ${height}dp` );
  console.log(`화면 너비: ${width * PixelRatio.get()}px , ${height* PixelRatio.get()}px` );
  

  return (    
    <View style={[styles.container,{paddingTop: insets.top, paddingBottom: insets.bottom}]}> 
      
      {/*style에서 위 아래 속성을 주는 paddingTop */}
      {/*Image를 require해서 불러온다 */}
      {/*width랑 height 없으면 이미지가 안 보여 */}
      {/*Blur View install 해야함 나중에 다시 해봐*/}
      {/* push는 히스토리에 싸이는것 replace 히스토리에 안 싸이는것(마지막것 빼고), navigate 중복을 제거하고 저장합니다 */}
      <BlurView style={styles.header} intensity={70} >
        
        {isLoggedIn && (
          <Pressable
            style={styles.menuButton}
            onPress={() => {
              setIsSideMenuOpen(true)
            }}
          >
            <Ionicons name="menu" size={24} color="black" />            
          </Pressable>
        )}        

        <SideMenu
          isVisible={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />

        <Image source={require ( "../../../assets/images/react-logo.png")}  
          style={styles.headerLogo}  
        />      
        
      </BlurView>  
      
      {isLoggedIn && (
        <View style={styles.tabContainer}>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.push(`/`)}>
              <Text style={{ color: Pathname === "/" ? "red" : "black"}}> For you</Text>
            </TouchableOpacity>
          </View>
        
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.push(`/following`)}> 
              <Text style={{ color: Pathname === "/" ? "black" : "red"}}> Following</Text>
            </TouchableOpacity>
          </View>
        </View>  
      )}

      <View>
        <TouchableOpacity onPress={() => router.replace(`/@yoonhill/post/1`)}>
          <Text>게시글1</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.replace(`/@yoonhill/post/2`)}>
          <Text>게시글2</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.replace(`/@yoonhill/post/3`)}>
          <Text>게시글3</Text>
        </TouchableOpacity>
      </View>      

    </View>    
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  tabContainer:{
    flexDirection: "row",
  },
  tab: {
    flex: 1,
  },
  header:{
    alignItems:"center",
  },
  headerLogo:{
    width:42,
    height:42,
  },
  loginButton:{
    position:"absolute",
    right:20,
    top:0,
    backgroundColor:"black",      
    borderWidth:1,
    borderColor: "black",
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:10,       
  },
  loginButtonText:{
    color:"white",
  },
  menuButton:{
    position:"absolute",
    left: 20,
    top: 10,
  },
});