import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usePacientesActivos } from "../hooks/usePacientesData";
import { PacientesCard } from "../components/PacientesCard";

export const PacientesScreens = () => {
    const { pacientes, isLoading, loadPacientes } = usePacientesActivos();
    const navigation = useNavigation<any>();

    useEffect(() => {
        loadPacientes();
    }, [loadPacientes]);

    const handlePacientePress = (paciente: any) => {
      
        navigation.navigate('PacienteHome', { paciente });
    };

    return (
        <View style={style.root}>
            <FlatList
                data={pacientes}
                keyExtractor={(paciente, index) => `${paciente.id_paciente}${index}`}
                ListHeaderComponent={(
                    <View style={style.headerContainer}>
                        <View style={style.headerContent}>
                            <Text style={style.titulo}>Pacientes</Text>
                            <TouchableOpacity 
                                style={style.buttonAgregar}
                                onPress={() => navigation.navigate('CrearPaciente')}
                            >
                                <Text style={style.buttonText}>+ Agregar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                numColumns={2} 
                columnWrapperStyle={{ justifyContent: 'center' }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handlePacientePress(item)}
                        activeOpacity={0.7}
                    >
                        <PacientesCard paciente={item} />
                    </TouchableOpacity>
                )}
                onEndReached={loadPacientes}
                onEndReachedThreshold={0.2}
                ListFooterComponent={(
                    <ActivityIndicator
                        style={{ height: 120 }}
                        size={60}
                        color="#3B82F6"
                    />
                )}
            />
        </View>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F8F9FB'
    },
    headerContainer: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#1F2937',
        marginBottom: 16
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titulo: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF'
    },
    buttonAgregar: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 12
    }
});
