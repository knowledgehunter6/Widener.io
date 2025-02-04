import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

const MOCK_JOBS = [
  {
    id: '1',
    title: 'Senior React Native Developer',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    salary: '$120k - $150k',
    posted: '2d ago',
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'Digital Innovations',
    location: 'New York, NY',
    salary: '$100k - $130k',
    posted: '3d ago',
  },
  // Add more mock jobs as needed
];

const JobsScreen = () => {
  const renderJobCard = ({ item }) => (
    <TouchableOpacity style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Icon name="bookmark" size={20} color="#64748b" />
      </View>
      <Text style={styles.companyName}>{item.company}</Text>
      <View style={styles.jobDetails}>
        <View style={styles.detailItem}>
          <Icon name="map-pin" size={16} color="#64748b" />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="dollar-sign" size={16} color="#64748b" />
          <Text style={styles.detailText}>{item.salary}</Text>
        </View>
      </View>
      <View style={styles.jobFooter}>
        <Text style={styles.postedTime}>{item.posted}</Text>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Quick Apply</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs..."
            placeholderTextColor="#64748b"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="sliders" size={20} color="#0891b2" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_JOBS}
        renderItem={renderJobCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.jobsList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#0f172a',
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  jobsList: {
    padding: 16,
  },
  jobCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  jobDetails: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    color: '#64748b',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  postedTime: {
    color: '#64748b',
  },
  applyButton: {
    backgroundColor: '#0891b2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  applyButtonText: {
    color: '#ffffff',
    fontWeight: '500',
  },
});

export default JobsScreen