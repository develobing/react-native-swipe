import Deck from '@/src/Deck';
import { Button, Card } from '@rneui/themed';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const DATA = [
  {
    id: 1,
    text: 'Card #1',
    uri: 'https://picsum.photos/300/200',
  },
  {
    id: 2,
    text: 'Card #2',
    uri: 'https://images.unsplash.com/5/unsplash-kitsune-3.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275',
  },
  {
    id: 3,
    text: 'Card #3',
    uri: 'https://placekitten.com/200/300',
  },
  {
    id: 4,
    text: 'Card #4',
    uri: 'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275',
  },
  {
    id: 5,
    text: 'Card #5',
    uri: 'https://loremflickr.com/200/300',
  },
  {
    id: 6,
    text: 'Card #6',
    uri: 'https://placebear.com/200/300',
  },
  {
    id: 7,
    text: 'Card #7',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg',
  },
  {
    id: 8,
    text: 'Card #8',
    uri: 'https://picsum.photos/200/300',
  },
];

export interface ICardData {
  id: number;
  text: string;
  uri: string;
}

export default function HomeScreen() {
  const renderCard = (item: ICardData) => {
    return (
      <Card key={item.id}>
        <Card.Title>{item.text}</Card.Title>
        <Card.Image source={{ uri: item.uri }} />
        <Text style={{ paddingVertical: 5 }}>
          I can customize the Card further.
        </Text>
        <Button
          icon={{ name: 'code', backgroundColor: '#23b4b9', color: '#ffffff' }}
        >
          View Now!
        </Button>
      </Card>
    );
  };

  const renderNoMoreCards = () => {
    return (
      <Card>
        <Card.Title>All Done!</Card.Title>
        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>There's no more content here!</Text>
        <Button
          icon={{ name: 'code', backgroundColor: '#23b4b9', color: '#ffffff' }}
        >
          Get More!
        </Button>
      </Card>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Deck
          data={DATA}
          renderCard={renderCard}
          renderNoMoreCards={renderNoMoreCards}
          onSwipeLeft={(item) => {
            console.log('log: ', item);
          }}
          onSwipeRight={(item) => {
            console.log('log: ', item);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
});
