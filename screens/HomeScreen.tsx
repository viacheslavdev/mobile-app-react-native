import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign'
import Task from '@/assets/images/home-page/task.svg'
import IconWhite from '@/assets/images/tips/icon-white.svg'
import IconGreen from '@/assets/images/tips/icon-green.svg'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchPosts } from '@/redux/slices/postsSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/RootStackParamList';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HomeScreen'>
}


const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const posts = useSelector((state: RootState) => state.posts);
  const user = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(fetchPosts());
  }, [])

  const openPostDetail = (postId: number) => {
    navigation.navigate('PostScreen', {postId})
  }

  return (
    <ScrollView

      showsHorizontalScrollIndicator={false} style={styles.container}>
      <LinearGradient colors={['#F8AE78', '#FA8A34']} style={styles.gradient} start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.25]} >
        <Text style={styles.desc}>Your name</Text>
        <Text style={styles.text}>{user.user?.name} {user.user?.secondName}</Text>
      </LinearGradient>
      <View style={styles.taskWrapper}>
        <TouchableOpacity style={styles.task}>
          <View style={styles.info}>
            <View style={styles.block}>
              <Text style={styles.taskHeader}>Test task</Text>
              <Text style={styles.taskDesc}>Lorem ipsum</Text>
            </View>
            <View style={styles.callWrapper}>
              <Text style={styles.call}>Go to call</Text>
              <AntDesign name="right" size={24} color="#009E81" />
            </View>
          </View>
          <Task />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Before you start</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tipsWrapper}>
        <TouchableOpacity style={styles.tipsBlockWhite}>
          <View style={styles.tipHeaderWhite}>
            <IconWhite />
            <Text style={styles.tipDescWhite}>Link you Bank Account</Text>
          </View>
          <View style={styles.stepsWhiteWrapper}>
            <Text style={styles.stepsWhite}>2 steps</Text>
            <AntDesign name="arrowright" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tipsBlockGreen}>
          <View style={styles.tipHeaderGreen}>
            <IconGreen />
            <Text style={styles.tipDescGreen}>Add funds to your wallet</Text>
          </View>
          <View style={styles.stepsWhiteWrapper}>
            <Text style={styles.stepsGreen}>2 steps</Text>
            <AntDesign name="arrowright" size={24} color="#606773" />
          </View>
        </TouchableOpacity>
      </ScrollView>
      <Text style={styles.header}>Before you start</Text>
      <View style={styles.postsWrapper}>
        {posts.posts.slice(0, 3).map(post => (
          <TouchableOpacity key={post.id} style={styles.post} onPress={() => openPostDetail(post.id)}>
            <Text style={styles.postTitle} numberOfLines={2} ellipsizeMode="tail">{post.title}</Text>
            <Text style={styles.postBody} numberOfLines={2} ellipsizeMode="tail">{post.body}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F3F5',
  },
  text: {
    fontSize: 28,
    color: '#fff',
    lineHeight: 32,
    fontWeight: 'bold'
  },
  desc: {
    fontSize: 13,
    lineHeight: 16,
    color: 'white',
    marginBottom: 8
  }, 
  gradient: {
    width: '100%',
    height: 296,
    borderBottomRightRadius: 28,
    borderBottomLeftRadius: 28,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  taskWrapper: {
    marginHorizontal: 16,
    marginBottom: 32
  },
  info: {
    justifyContent: 'center',
    gap: 24
  },
  block: {
    gap: 4
  },
  taskHeader: {
    fontWeight: 'bold',
    color: '#06070A',
    lineHeight: 18
  },
  taskDesc: {
    fontSize: 13,
    color: '#858C94'
  },
  callWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: 138
  },
  call: {
    color: '#009E81',
    fontWeight: 'medium',
    fontSize: 15,
    lineHeight: 24
  },
  task: {
    paddingVertical: 8,
    paddingLeft: 24,
    paddingRight: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    marginLeft: 16,
    fontSize: 15,
    color: '#606773',
    marginBottom: 8
  },
  tipsWrapper: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    marginBottom: 32
  },
  tipsBlockWhite: {
    backgroundColor: '#636363',
    width: 233,
    height: 152,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    justifyContent: 'space-between',
    marginRight: 16
  },
  tipHeaderWhite: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tipDescWhite: {
    color: 'white',
    lineHeight: 24,
    fontSize: 15,
    fontWeight: 'medium',
    flexWrap: 'wrap',
    width: 133
  },
  stepsWhiteWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepsWhite: {
    color: 'white',
    lineHeight: 24,
    fontSize: 16,
  },

  tipsBlockGreen: {
    backgroundColor: '#EE6363',
    width: 233,
    height: 152,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    justifyContent: 'space-between',
    marginRight: 16
  },
  tipHeaderGreen: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tipDescGreen: {
    color: 'black',
    lineHeight: 24,
    fontSize: 15,
    fontWeight: 'medium',
    flexWrap: 'wrap',
    width: 133
  },
  stepsGreen: {
    color: '#606773',
    lineHeight: 24,
    fontSize: 16
  },
  postsWrapper: {
    paddingHorizontal: 16,
    gap: 8
  },
  post: {
    borderRadius: 16,
    padding: 12,
    backgroundColor: 'white',
    gap: 8,
    height: 111
  },
  postTitle: {
    fontWeight: 'bold',
    color: '#171718',
    fontSize: 18
  },
  postBody: {
    color: '#414141',
    fontSize: 16
  }





});

export default HomeScreen;
