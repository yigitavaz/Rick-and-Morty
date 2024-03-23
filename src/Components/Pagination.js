import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <View style={styles.paginationContainer}>
            <TouchableOpacity
                disabled={currentPage <= 1}
                onPress={() => onPageChange(currentPage - 1)}
            >
                <Ionicons name="arrow-back-circle-outline" style={[styles.arrowBack, (currentPage <= 1 && styles.disabled)]}></Ionicons>
            </TouchableOpacity>
            <Text style={styles.pageItem}>{currentPage} / {totalPages}</Text>
            <TouchableOpacity
                disabled={currentPage >= totalPages}
                onPress={() => onPageChange(currentPage + 1)}
            >
                <Ionicons name="arrow-forward-circle-outline" style={[styles.arrowNext, (currentPage >= totalPages && styles.disabled)]}></Ionicons>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: 'white',
        marginBottom: 10,
        borderTopWidth: 0.5,
        borderColor: '#979797'
    },
    arrowBack: {
        fontSize: 30,
        marginHorizontal: 20,

    },
    arrowNext: {
        fontSize: 30,
        marginHorizontal: 20,
    },
    pageItem: {
        marginHorizontal: 20,
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',

    },
    disabled: {
        color: '#BBBBBB'
    }
});

export default Pagination;
