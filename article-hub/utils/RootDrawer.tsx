import HomeScreen from "../screens/HomeScreen";
import ArticlesScreen from "../screens/ArticlesScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";

const RootDrawer=()=>{
    const drawer=createDrawerNavigator();
    return(
        <>
            <drawer.Navigator>
                <drawer.Screen name="خانه" component={HomeScreen}/>
                <drawer.Screen name="مقالات" component={ArticlesScreen}/>
            </drawer.Navigator>
        </>
    )
}
export default RootDrawer