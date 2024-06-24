import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RootStackParamList } from '@/types/RootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { AntDesign } from '@expo/vector-icons';
import Post from '@/assets/images/post/post.svg'
import axios from 'axios';

type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

type PostScreenRouteProp = RouteProp<RootStackParamList, 'PostScreen'>;

type PostScreenProps = {
  route: PostScreenRouteProp;
  navigation: StackNavigationProp<RootStackParamList, 'PostScreen'>;
};

const PostScreen: React.FC<PostScreenProps> = ({ route, navigation }) => {

  const { postId } = route.params

  const post = useSelector((state: RootState) =>
    state.posts.posts.find((post) => post.id === postId)
  );

  const [comments, setComments] = useState<Comment[]>([])


  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    getComments();
  }, [postId]);

  const handleBack = () => {
    navigation.goBack();
  };


  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      <AntDesign name="left" size={24} color="black" style={styles.arrowBack} onPress={handleBack}/>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{post?.title}</Text>
          <Post />
      </View>

      <Text style={styles.header}>About</Text>
      <View style={styles.bodyWrapper}>
        <Text style={styles.bodyPost}>{post?.body}</Text>
      </View>
      <Text style={styles.header}>Comments</Text>
      <View style={styles.commentWrapper}>
        {comments.map((comment) => (
          <View key={comment.id} style={styles.comment}>
            <Text style={styles.commentName}>{comment.name}</Text>
            <Text style={styles.commentEmail}>{comment.email}</Text>
            <Text style={styles.commentBody}>{comment.body}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 32,
    textAlign: 'center'
  },
  body: {
    fontSize: 18,
  },
  arrowBack: {
    position: 'absolute',
    top: 56,
    margin: 12,
    zIndex: 10
  },
  titleWrapper: {
    backgroundColor: 'white',
    height: 480,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 27,
    paddingHorizontal: 16,
    gap: 40
  },
  header: {
    marginLeft: 16,
    fontSize: 15,
    color: '#606773',
    marginBottom: 8,
    marginTop: 16
  },
  bodyWrapper: {
    marginHorizontal: 16,
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 32
  },
  bodyPost: {
    fontSize: 15,
    lineHeight: 32
  },
  commentWrapper: {
    paddingHorizontal: 16,
    gap: 12
  },
  comment: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 16
  },
  commentName: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
    marginBottom: 2
  },
  commentEmail: {
    fontSize: 16,
    lineHeight: 24,
    color: '#3E3E3E',
    marginBottom: 12
  },

  commentBody: {
    fontSize: 14,
    lineHeight: 19
  }
});

export default PostScreen;
