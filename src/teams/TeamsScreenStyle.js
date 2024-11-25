import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#000000',
  },
  categoryTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  activeCategoryButton: {
    backgroundColor: '#cc0000',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  activeCategoryButtonText: {
    color: '#ffffff',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#222222',
    borderRadius: 12,
    padding: 12,
    elevation: 3,
  },
  teamImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  riderName: {
    fontSize: 14,
    color: '#aaaaaa',
  },
});

export default styles;
