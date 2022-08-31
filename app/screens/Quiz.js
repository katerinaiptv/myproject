import React from 'react';
import {View, Text, SafeAreaView, StatusBar,Image,TouchableOpacity,Modal,Animated } from 'react-native';
import colors from '../config/colors';
import { SIZES } from '../config/theme';

import {useState} from "react";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { render } from 'react-dom';
import { set } from 'react-native-reanimated';



const Quiz = () => {

    const allQuestions = [
        
        {
            question: "I could handle a major unexpected expense",
           options: ["Completely", "Very well", "Somewhat", "Very little","Not at all"],
            answer: [{"name": "Completely", value: 4}, {"name":"Very well", value: 3}, {"name":"Somewhat", value: 2}, {"name":"Very little", value: 1}, {"name": "Not at all", value: 0}]
        }
        ,
        {
            question: "I am securing my financial future",
            options: ["Completely", "Very well", "Somewhat", "Very little","Not at all"],
            answer: [{"name": "Completely", value: 4}, {"name":"Very well", value: 3}, {"name":"Somewhat", value: 2}, {"name":"Very little", value: 1}, {"name": "Not at all", value: 0}]
        },
        {
            question: "Because of my money situation, I feel like I will never have the things I want in life",
            options: ["Completely", "Very well", "Somewhat", "Very little","Not at all"],
            answer: [{"name": "Completely", value: 0}, {"name":"Very well", value: 1}, {"name":"Somewhat", value: 2}, {"name":"Very little", value: 3}, {"name": "Not at all", value: 4}]
        },
        {
            question: "I can enjoy life because of the way I’m managing my money",
            options: ["Completely", "Very well", "Somewhat", "Very little","Not at all"],
            answer: [{"name": "Completely", value: 4}, {"name":"Very well", value: 3}, {"name":"Somewhat", value: 2}, {"name":"Very little", value: 1}, {"name": "Not at all", value: 0}]
        },
        {
            question: "I am just getting by financially",
            options: ["Completely", "Very well", "Somewhat", "Very little","Not at all"],
            answer: [{"name": "Completely", value: 0}, {"name":"Very well", value: 1}, {"name":"Somewhat", value: 2}, {"name":"Very little", value: 3}, {"name": "Not at all", value: 4}]
        },
    
        {
            question: "I am concerned that the money I have or will save won’t last",
            options: ["Completely", "Very well", "Somewhat", "Very little","Not at all"],
            answer: [{"name": "Completely", value: 0}, {"name":"Very well", value: 1}, {"name":"Somewhat", value: 2}, {"name":"Very little", value: 3}, {"name": "Not at all", value: 4}]
        },

        
         {
            question: " Giving a gift for a wedding, birthday or other occasion would put a strain on my finances for the month",
            options: ["Always","Often", "Sometimes","Rarely", "Never"],
            answer: [{"name":"Always", value: 0}, {"name":"Often", value: 1}, {"name":"Sometimes", value: 2}, {"name":"Rarely", value:3}, {"name":"Never", value: 4}]
        },
        { 
          question: "I have money left over at the end of the month",
          options: ["Always","Often", "Sometimes","Rarely", "Never"],
          answer: [{"name":"Always", value: 4}, {"name":"Often", value: 3}, {"name":"Sometimes", value: 2}, {"name":"Rarely", value:1}, {"name":"Never", value: 0}]
        },
        {
          question: "I am behind with my finances",
          options: ["Always","Often", "Sometimes","Rarely", "Never"],
          answer: [{"name":"Always", value: 0}, {"name":"Often", value: 1}, {"name":"Sometimes", value: 2}, {"name":"Rarely", value:3}, {"name":"Never", value: 4}]
        },
       {
          question: "My finances control my life ",
          options: ["Always","Often", "Sometimes","Rarely", "Never"],
          answer: [{"name":"Always", value: 0}, {"name":"Often", value: 1}, {"name":"Sometimes", value: 2}, {"name":"Rarely", value:3}, {"name":"Never", value: 4}]
        }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);

    let totalValue = 0 ;
    

    function validateAnswer(selectedOption) {
      //  let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
      //  setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
       
        let sum=allQuestions.reduce(function(prev,current){
            return prev+current.score
        },0)

       // allQuestions.map(({name,value},i) => {
            // I see there is no fat key value in first object id:0 so this check 
            // to make sure value exist
        //      name.value && (totalValue = totalValue + name.value)
        //    })
       // setScore(totalValue)
       // if (selectedOption == correct_option) {
            // Set Score
          //  setScore(score + 1);
       // }


        // Show Next Button
        setShowNextButton(true);
    }

    const handleNext = () => {
        if(currentQuestionIndex== allQuestions.length-1){
            // Last Question
            // Show Score Modal
            setShowScoreModal(true)
        }else{
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }

        Animated.timing(progress, {
            toValue: currentQuestionIndex+1,
            duration: 1000,
            useNativeDriver: false
        }).start();
        
    }

    const renderQuestion = () => {
        return (
            
            <View style={{
                marginVertical: 40
            }}>
                {/* Question Counter */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{color: colors.qtext, fontSize: 20, opacity: 0.6, marginRight: 2}}>{currentQuestionIndex+1}</Text>
                    <Text style={{color: colors.qtext, fontSize: 18, opacity: 0.6}}>/ {allQuestions.length}</Text>
                </View>


                {/* Question */}
                <Text style={{
                    color: colors.qtext,
                    fontSize: 30
                }}>{allQuestions[currentQuestionIndex]?.question}</Text>
            </View>
        )
            } 

const renderOptions = () => {
    return (
        <View>
            {
                allQuestions[currentQuestionIndex]?.options.map(option => (
                    <TouchableOpacity 
                    onPress={()=> validateAnswer(option)}
                    disabled={isOptionsDisabled}
                    key={option}
                    style={{
                        borderWidth: 3,

                        borderColor: option==correctOption 
                        ? colors.success
                        : option==currentOptionSelected 
                        ? colors.error 
                        : colors.primary+'99',
                        
                        backgroundColor: colors.primary,
                       
                        height: 60, borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        marginVertical: 10
                    }}
                    >
                         <Text style={{fontSize: 20, color: colors.white, textAlign: 'center'}}>{option}</Text>


                       {/* Show Check Or Cross Icon based on correct answer*/}
                       {/* {
                           option==correctOption ? (
                                 <View style={{
                                   width: 30, height: 30, borderRadius: 30/2,
                                    backgroundColor: colors.success,
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <MaterialCommunityIcons name="check" style={{
                                        color: colors.qtext,
                                       fontSize: 20
                                    }} />
                                
                                </View>
                               
                            ): option == currentOptionSelected ? (
                                <View style={{
                                    width: 30, height: 30, borderRadius: 30/2,
                                    backgroundColor: colors.error,
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <MaterialCommunityIcons name="close" style={{
                                        color: colors.qtext,
                                        fontSize: 20
                                    }} />
                                
                                </View>
                                
                            ) : null
                        }
                    */}
                    </TouchableOpacity>
                ))
            }
        </View>
    )

}

const renderNextButton =() => {
    if(showNextButton){
        return (
            <TouchableOpacity
            onPress={handleNext}
            style={{
                marginTop: 20, width: '100%', backgroundColor: colors.secondary, padding: 20, borderRadius: 25
            }}>
                <Text style={{fontSize: 20, color: colors.white, textAlign: 'center', textTransform: "uppercase",
    fontWeight: "bold"}}>Next</Text>
            </TouchableOpacity>
        )
    }else{
        return null
    }

}



const restartQuiz =() => {
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false
    }).start();


}


const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%','100%']
    })
const renderProgressBar =() => {
    return (
        <View style={{
            width: '100%',
            height: 20,
            borderRadius: 20,
            backgroundColor: '#00000020',

        }}>
            <Animated.View style={[{
                height: 20,
                borderRadius: 20,
                backgroundColor: colors.secondary
            },{
                width: progressAnim
            }]}>

            </Animated.View>

        </View>
    )


}

return(
<SafeAreaView style={{
flex: 1

}}>

 <StatusBar barStyle='light-content' backgroundColor={colors.primary}/> 
 <View style={{
               flex: 1,
               paddingVertical: 40,
               paddingHorizontal: 16,
               backgroundColor: colors.background,
               position:'relative'
           }}>

            {/* ProgressBar*/}
            {renderProgressBar()}

            {/* Question*/}
             {renderQuestion()}   

            {/* Options*/}
            {renderOptions()}


            {/* Next Button*/}
             {renderNextButton()}    

             {/*Score Modal */}
             <Modal
               animationType="slide"
               transparent={true}
               visible={showScoreModal}
               >
                   <View style={{
                       flex: 1,
                       backgroundColor: colors.primary,
                       alignItems: 'center',
                       justifyContent: 'center'
                   }}>
                       <View style={{
                           backgroundColor: colors.white,
                           width: '90%',
                           borderRadius: 20,
                           padding: 20,
                           alignItems: 'center'
                       }}>
                           <Text style={{fontSize: 30, fontWeight: 'bold'}}>{ score> (allQuestions.length/2) ? 'Congratulations!' : 'Oops!' }</Text>
                                         
                           
                           <View style={{
                               flexDirection: 'row',
                               justifyContent: 'flex-start',
                               alignItems: 'center',
                               marginVertical: 20
                           }}>
                               <Text style={{
                                   fontSize: 30,
                                   color: score> (allQuestions.length/2) ? colors.success : colors.error
                               }}>{score}</Text>
                                <Text style={{
                                    fontSize: 20, color: colors.black
                                }}>/ { allQuestions.length }</Text>
                           </View>
                           {/* Retry Quiz button */}
                           <TouchableOpacity
                           onPress={restartQuiz}
                           style={{
                               backgroundColor: colors.secondary,
                               padding: 20, width: '100%', borderRadius: 20
                           }}>
                               <Text style={{
                                   textAlign: 'center', color: colors.white, fontSize: 20
                               }}>Retry Quiz</Text>
                           </TouchableOpacity>

                       </View>
                   </View>
               </Modal>

            {/* BackgroundImage*/}

             {/*  <Image                                    */}
             {/*  source={require('../assets/ws5.jpg')}     */}
             {/*   style={{                                 */}    
             {/*        width: SIZES.width,                 */} 
             {/*       height: 130,                          */}
             {/*       zIndex: -1,                          */}   
             {/*       position: 'absolute',                 */}
             {/*       bottom: 0,                            */}   
             {/*       left: 0,                              */}   
             {/*       right: 0,                             */}  
             {/*       opacity: 0.5                          */}  
            {/*  }}                                           */}
            {/*    resizeMode={'contain'}                    */}
             {/*   />                                        */}  








 </View>

</SafeAreaView>


);


};

export default Quiz