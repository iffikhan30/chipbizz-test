import { Text, View } from "react-native";
import {PanGestureHandler} from 'react-native-gesture-handler';
import  Animated, {
    Extrapolate,
    Interpolate,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from '@expo/vector-icons/Entypo';
const SwipeButton = (props) => {
    const X = useSharedValue(10);
    const animatedGestureHandler = useAnimatedGestureHandler({
        onActive: e =>{
            if(e.translateX < 0) {
                X.value = -e.translateX;
            }else{
                X.value = e.translateX;
            }
        },
        onEnd: () => {
            if(X.value < 150){
                X.value = withSpring(10);
            }else{
                X.value = withSpring(270);
            }
        }

    });
    const animatedStyle = useAnimatedStyle(()=>{
        return {transform:[{translateX:X.value}]}
    })
    return (
        <>
        <View style={{justifyContent:'center',width:'100%',alignItems:'center'}}>
            <View style={{width:300,height:60,backgroundColor:'#f4ecdd',borderStyle:'solid',borderWidth:1,borderColor:'#e3e0d2',paddingLeft:10,paddingRight:10,justifyContent:'center',borderRadius:10,marginTop:30,marginBottom:30,alignItems:'center'}}>
                <Text style={{color:'#4fae63',fontWeight:'600',fontSize:18}}>Swipe to Check-in</Text>
                <PanGestureHandler onGestureEvent={animatedGestureHandler}>
                    <Animated.View style={[{
                        width:105,
                        height:105,
                        position:'absolute',
                        left:-30,
                        borderRadius:100,
                        justifyContent:'center',
                        alignItems:'center',
                        borderWidth:1,
                        borderColor:'#e3e0d2',
                        borderStyle:'solid',
                        },animatedStyle
                        ]}>
                        <View style={{
                        width:85,
                        height:85,
                        borderRadius:100,
                        justifyContent:'center',
                        alignItems:'center',
                        borderWidth:1,
                        borderColor:'#e3e0d2',
                        borderStyle:'solid'
                        }}>
                            <LinearGradient colors={['#02a031', '#72b300', '#dbc800']} 
                                style={{
                                    width:80,
                                    height:80,
                                    position:'relative',
                                    left:0,
                                    borderRadius:100,
                                    justifyContent:'center',
                                    borderWidth:1,
                                    borderColor:'#e3e0d2',
                                    borderStyle:'solid',
                                    alignItems:'center'
                                    }}>
                                    <Entypo 
                                        size={32} 
                                        color="white"
                                        name={'fingerprint'} 
                                        />
                            </LinearGradient>
                        </View>
                    </Animated.View>
                </PanGestureHandler>
            </View>
        </View>
        </>
    );
}
export default SwipeButton;