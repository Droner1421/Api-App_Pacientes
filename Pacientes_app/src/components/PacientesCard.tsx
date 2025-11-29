import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../navigator/PacientesNavigator";
import { PacientesActivos } from "../interfaces/pacientesInterface";

interface Props {
    paciente: PacientesActivos;
}

export const PacientesCard = ({paciente}: Props) => {
    const widthDimension = Dimensions.get('window').width;
    
    type PacientesCardNavigationProp = StackNavigationProp<RootStackParams, 'PacienteHome'>;
    const navigation = useNavigation<PacientesCardNavigationProp>();

    return (
        <View>  
            <TouchableOpacity
                onPress={ () => navigation.navigate("PacienteHome", { paciente }) }
                activeOpacity={ 0.7 }
            >
                <View
                    style={{
                        ...style.cardContainer,
                        width: widthDimension * 0.42,
                    }}
                >
                    <View style={ style.colorBar } />
                    <View style={ style.contentWrapper }>
                        <Text
                            style={ style.nombre }
                        >
                            { paciente.nombre }
                        </Text>
                        <Text
                            style={ style.apellido }
                        >
                            { paciente.apellido }
                        </Text>
                        <Text
                            style={ style.tipoSangre }
                        >
                            { paciente.tipo_sangre }
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 8,
        width: 60,
        height: 90,
        marginBottom: 18,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3
    },
    colorBar: {
        height: 4,
        backgroundColor: '#3B82F6',
        width: '100%'
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 14,
        justifyContent: 'flex-start'
    },
    nombre: {
        color: "#1F2937",
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 6,
        lineHeight: 18
    },
    apellido: {
        color: "#6B7280",
        fontSize: 13,
        fontWeight: "600",
        marginBottom: 8,
        lineHeight: 16
    },
    tipoSangre: {
        color: "#ff0000ff",
        fontSize: 11,
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: 0.3
    }
});
