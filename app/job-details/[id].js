import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import axios from 'axios';

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  
  // Local state
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Fetch data on mount
  const fetchJobDetails = async () => {
    try {
      const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/job-details',
        params: {
          job_id: params.id,
          extended_publisher_details: 'false',
        },
        headers: {
          'x-rapidapi-key': 'your-api-key', // Replace with your actual API key
          'x-rapidapi-host': 'jsearch.p.rapidapi.com',
        },
      };

      const response = await axios.request(options);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError('Something went wrong');
      setIsLoading(false);
    }
  };

  // Refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchJobDetails(); // Refetch data
    setRefreshing(false);
  }, []);

  // Fetch job details when the component mounts
  useEffect(() => {
    fetchJobDetails();
  }, [params.id]); // Run when `params.id` changes

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return <Specifics title="Qualifications" points={data.job_highlights?.Qualifications ?? ['N/A']} />;
      case "About":
        return <JobAbout info={data.job_description ?? "No data provided"} />;
      case "Responsibilities":
        return <Specifics title="Responsibilities" points={data.job_highlights?.Responsibilities ?? ['N/A']} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: '',
        }}
      />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>{error}</Text>
        ) : data.length === 0 ? (
          <Text>No Data</Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Company 
              companyLogo={data.employer_logo}
              jobTitle={data.job_title}
              companyName={data.employer_name}
              Location={data.job_country}
            />

            <JobTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {displayTabContent()}
          </View>
        )}
      </ScrollView>

      <JobFooter url={data.job_google_link ?? 'https://careers.google.com/jobs/results'} />
    </SafeAreaView>
  );
};

export default JobDetails;
