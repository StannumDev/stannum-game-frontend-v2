'use client'

import { createPrompt, createAssistant } from '@/services';

export const createTestPrompt = async (): Promise<boolean> => {
    try {
        const testPromptData = {
            title: "Prompt de Ventas B2B Profesional",
            description: "Un prompt poderoso para generar estrategias de ventas consultivas enfocadas en alto valor y largo plazo.",
            content: `Actúa como un consultor de ventas B2B senior con 15 años de experiencia.
            
                Tu objetivo es ayudarme a desarrollar una estrategia de ventas consultiva para [PRODUCTO/SERVICIO].

                Información del contexto:
                - Industria: [INDUSTRIA]
                - Cliente ideal: [DESCRIPCIÓN DEL ICP]
                - Ticket promedio: [RANGO DE PRECIO]
                - Ciclo de venta típico: [DURACIÓN]

                Genera una estrategia que incluya:
                1. Análisis del dolor principal del cliente
                2. Preguntas de discovery para la primera llamada
                3. Framework de propuesta de valor único
                4. Objeciones comunes y cómo manejarlas
                5. Secuencia de seguimiento para cerrar la venta

                Formato de salida: Estructurado, accionable y profesional.`,
            category: "sales",
            difficulty: "advanced",
            platforms: ["chatgpt", "claude", "gemini"],
            tags: ["b2b", "ventas", "consultivo", "estrategia", "discovery"],
            exampleOutput: "**Análisis del Dolor Principal:**\n\nEl cliente enfrenta [DOLOR] que le cuesta [IMPACTO CUANTIFICABLE] en tiempo/dinero...\n\n**Preguntas de Discovery:**\n1. ¿Cuál es el mayor desafío que enfrentan actualmente con [ÁREA]?\n2. ¿Qué han intentado hacer hasta ahora para resolverlo?\n..."
        };

        const result = await createPrompt(testPromptData);
        if (result) {
            console.log('✅ Prompt de prueba creado exitosamente');
            return true;
        } else {
            console.error('❌ Error al crear prompt de prueba');
            return false;
        }
    } catch (error) {
        console.error('❌ Error en createTestPrompt:', error);
        throw error;
    }
};

export const createTestAssistant = async (): Promise<boolean> => {
    try {
        const testAssistantData = {
            title: "STANNUM Sales Coach - Entrenador de Ventas High Ticket",
            description: "Asistente especializado en entrenar equipos de ventas para cerrar deals de alto valor usando metodología consultiva y framework STANNUM.",
            assistantUrl: "https://chat.openai.com/g/g-XXXXXXXXX-stannum-sales-coach",
            category: "sales",
            difficulty: "advanced",
            platforms: ["chatgpt", "claude"],
            tags: ["ventas", "high-ticket", "coaching", "b2b", "consultivo", "roleplay"],
            useCases: `Este asistente es ideal para:

            1. **Roleplay de Ventas:** Simula llamadas de descubrimiento y negociación con clientes difíciles.

            2. **Análisis de Deals:** Revisa tus oportunidades actuales y sugiere estrategias para avanzar.

            3. **Preparación de Reuniones:** Te ayuda a preparar llamadas importantes con preguntas de discovery y manejo de objeciones.

            4. **Onboarding de Vendedores:** Entrena a nuevos miembros del equipo en metodología consultiva.

            5. **Análisis Post-Mortem:** Revisa deals perdidos y extrae insights accionables.

            Casos de uso reales:
            - Equipos de venta B2B con ticket >$10K
            - Founders que venden su primer producto
            - Sales managers entrenando equipos
            - Consultores que necesitan mejorar su proceso comercial`
        };

        const result = await createAssistant(testAssistantData);
        
        if (result) {
            console.log('✅ Asistente de prueba creado exitosamente');
            return true;
        } else {
            console.error('❌ Error al crear asistente de prueba');
            return false;
        }
    } catch (error) {
        console.error('❌ Error en createTestAssistant:', error);
        throw error;
    }
};

export const createAllTestEntities = async (): Promise<void> => {
    console.log('🚀 Iniciando creación de entidades de prueba...');
    
    try {
        console.log('\n📝 Creando prompt de prueba...');
        await createTestPrompt();
        
        console.log('\n🤖 Creando asistente de prueba...');
        await createTestAssistant();
        
        console.log('\n✅ Todas las entidades de prueba fueron creadas exitosamente');
    } catch (error) {
        console.error('\n❌ Error al crear entidades de prueba:', error);
        throw error;
    }
};