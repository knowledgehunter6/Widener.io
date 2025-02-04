import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }}
              style={styles.profileImage}
            />
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.title}>Senior Software Developer</Text>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Icon name="edit-2" size={16} color="#ffffff" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents</Text>
          <View style={styles.documentCard}>
            <Icon name="file-text" size={24} color="#0891b2" />
            <View style={styles.documentInfo}>
              <Text style={styles.documentTitle}>Resume.pdf</Text>
              <Text style={styles.documentMeta}>Updated 2 days ago</Text>
            </View>
            <Icon name="edit" size={20} color="#64748b" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.preferencesList}>
            <TouchableOpacity style={styles.preferenceItem}>
              <View style={styles.preferenceLeft}>
                <Icon name="briefcase" size={20} color="#64748b" />
                <Text style={styles.preferenceText}>Job Types</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#64748b" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.preferenceItem}>
              <View style={styles.preferenceLeft}>
                <Icon name="map-pin" size={20} color="#64748b" />
                <Text style={styles.preferenceText}>Location Preferences</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#64748b" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.preferenceItem}>
              <View style={styles.preferenceLeft}>
                <Icon name="dollar-sign" size={20} color="#64748b" />
                <Text style={styles.preferenceText}>Salary Expectations</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsList}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="bell" size={20} color="#64748b" />
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#64748b" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="lock" size={20} color="#64748b" />
                <Text style={styles.settingText}>Privacy</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  title: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0891b2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
    gap: 8,
  },
  editButtonText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
  },
  documentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  documentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
  },
  documentMeta: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  preferencesList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  preferenceText: {
    fontSize: 16,
    color: '#0f172a',
  },
  settingsList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#0f172a',
  },
});