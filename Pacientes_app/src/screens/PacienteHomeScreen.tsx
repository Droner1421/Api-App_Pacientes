import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, RefreshControl } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { PatientDrawerParams } from "../navigator/PatientDrawerNavigator";
import { usePacienteCompleto } from "../hooks/usePacientesData";

type Props = DrawerScreenProps<PatientDrawerParams, 'InformacionPaciente'>;

export const PacienteHomeScreen = ({ route }: Props) => {
    const { paciente: pacienteInitial } = route.params;
    const { paciente, isLoading, loadPacienteData } = usePacienteCompleto();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (pacienteInitial?.id_paciente) {
            loadPacienteData(pacienteInitial.id_paciente);
        }
    }, [pacienteInitial?.id_paciente]);

    const onRefresh = async () => {
        setRefreshing(true);
        if (pacienteInitial?.id_paciente) {
            await loadPacienteData(pacienteInitial.id_paciente);
        }
        setRefreshing(false);
    };

    if (isLoading) {
        return (
            <View style={style.containerLoading}>
                <ActivityIndicator size={60} color="#3B82F6" />
            </View>
        );
    }

    const p = paciente || pacienteInitial;

    return (
        <ScrollView
            style={style.root}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor="#3B82F6"
                    colors={["#3B82F6"]}
                    progressBackgroundColor="#FFFFFF"
                />
            }
        >
            <View style={style.headerCard}>
                <Text style={style.nombreCompleto}>
                    {p.nombre} {p.apellido}
                </Text>
                <Text style={style.estado}>
                    {p.activo ? "Activo" : "Inactivo"}
                </Text>
            </View>

            <View style={style.section}>
                <Text style={style.sectionTitle}>Información Personal</Text>
                
                <View style={style.detailRow}>
                    <Text style={style.label}>ID Paciente:</Text>
                    <Text style={style.value}>{p.id_paciente}</Text>
                </View>

                <View style={style.detailRow}>
                    <Text style={style.label}>Fecha de Nacimiento:</Text>
                    <Text style={style.value}>{p.fecha_nacimiento || "N/A"}</Text>
                </View>

                <View style={style.detailRow}>
                    <Text style={style.label}>Sexo:</Text>
                    <Text style={style.value}>{p.sexo === 'M' ? 'Masculino' : p.sexo === 'F' ? 'Femenino' : 'N/A'}</Text>
                </View>

                <View style={style.detailRow}>
                    <Text style={style.label}>Teléfono:</Text>
                    <Text style={style.value}>{p.telefono || "N/A"}</Text>
                </View>

                <View style={style.detailRow}>
                    <Text style={style.label}>Direccióoon:</Text>
                    <Text style={style.value}>{p.direccion || "N/A"}</Text>
                </View>
            </View>

            <View style={style.section}>
                <Text style={style.sectionTitle}>Informaciónnn Médica</Text>

                <View style={style.detailRow}>
                    <Text style={style.label}>Tipo de Sangre:</Text>
                    <Text style={[style.value, style.bloodType]}>{p.tipo_sangre || "N/A"}</Text>
                </View>

                <View style={style.detailRow}>
                    <Text style={style.label}>Alergias:</Text>
                    <Text style={style.value}>{p.alergias || "Sin alergias conocidas"}</Text>
                </View>
            </View>

            <View style={{ height: 100 }} />
        </ScrollView>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F8F9FB',
        padding: 16,
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FB',
    },
    headerCard: {
        backgroundColor: '#1F2937',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
    },
    nombreCompleto: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    estado: {
        fontSize: 14,
        fontWeight: '600',
        color: '#10B981',
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
        flex: 1,
    },
    value: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1F2937',
        flex: 1,
        textAlign: 'right',
    },
    bloodType: {
        color: '#3B82F6',
        fontWeight: '700',
    },
});
