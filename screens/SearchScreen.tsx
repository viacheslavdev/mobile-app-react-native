import { Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/RootStackParamList';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


type SearchScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'HomeScreen'>
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {

    const posts = useSelector((state: RootState) => state.posts.posts)

    const openPostDetail = (postId: number) => {
        navigation.navigate('PostScreen', {postId})
      }

    return (
        <ScrollView 
            showsHorizontalScrollIndicator={false}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>Search</Text>
                {posts.map((post) => (
                    <TouchableOpacity style={styles.postWrapper} key={post.id} onPress={() => openPostDetail(post.id)}>
                        <Text style={styles.postId}>ID: {post.id}</Text>
                        <Text style={styles.postName} numberOfLines={1} ellipsizeMode="tail" >Name: {post.title}</Text>
                    </TouchableOpacity>
                ))}
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 12,
        backgroundColor: '#F2F3F5',
        gap: 8
    },
    text: {
        fontSize: 22,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom: 16
    },
    postWrapper: {
        backgroundColor: 'white',
        paddingVertical: 23,
        paddingHorizontal: 16,
        borderRadius: 16,
        gap: 2
    },
    postId: {
        fontSize: 15,
        lineHeight: 24,
        fontWeight: 'medium'
    },
    postName: {
        fontSize: 13,
        lineHeight: 16,
        color: '#858C94'
    }
});

export default SearchScreen