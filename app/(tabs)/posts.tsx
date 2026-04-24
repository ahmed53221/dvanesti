import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, } from 'react-native';
import { TouchableOpacity } from 'react-native';

type Post = {
  id: number;
  title: string;
  body: string;
};
type State = {
  posts: Post[];
  loading: boolean;
};

export default class Posts extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      posts: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const data = await response.json();

      this.setState({
        posts: data,
        loading: false,
      });
    } catch (error) {
      console.log('Error:', error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { posts, loading } = this.state;

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
             <TouchableOpacity onPress={() => alert(item.title)}>
              <View style={styles.card}>
              <Text style={styles.id}>{item.id}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </View>
             </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: ' #f2f2f2',
    borderRadius: 10,
  },
  id: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  body: {
    fontSize: 14,
    color: ' #555',
  },
});