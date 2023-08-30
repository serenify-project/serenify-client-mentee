export default function BackButton() {
  return (
    <SafeAreaView className="flex">
      {/* Back Button */}
      <View className="flex-row justify-start">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          style={{ backgroundColor: themeColors.bg2 }}
        >
          <ArrowLeftIcon size="20" color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
