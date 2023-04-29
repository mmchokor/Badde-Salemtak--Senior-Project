import FastImage from 'react-native-fast-image'

const YourImage = ({uri, styles}) => (
    <FastImage
        style={styles}
        source={{
            uri: uri,
            //headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
    />
)

export default YourImage