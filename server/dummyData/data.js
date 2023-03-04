var bcrypt = require("bcrypt");
module.exports = {
    owner: [
        {
            id: 1,
            name: 'Christian',
            lastName: 'Intriago',
            cellphone: '0939001295',
            email: 'noelia-2345@hotmail.com',
            password: '$2a$12$xVzTkiGzquWl0Qk6lf2qg.QT8.hrmyDM8k3vu2Ft2geGRIf/nqrF.',
            userType: 1
        },
        {
            id: 2,
            name: 'Daniel',
            lastName: 'Intriago',
            cellphone: '0915001395',
            email: 'dintriago@hotmail.com',
            password: '$2a$12$xVzTkiGzquWl0Qk6lf2qg.QT8.hrmyDM8k3vu2Ft2geGRIf/nqrF.',
            userType: 1
        },
        {
            id: 3,
            name: 'María',
            lastName: 'López',
            cellphone: '0987005695',
            email: 'mlopez@hotmail.com',
            password: '$2a$12$xVzTkiGzquWl0Qk6lf2qg.QT8.hrmyDM8k3vu2Ft2geGRIf/nqrF.',
            userType: 1
        },
        {
            id: 4,
            name: 'Dayanna',
            lastName: 'Serrani',
            cellphone: '0925148995',
            email: 'dserrani@hotmail.com',
            password: '$2a$12$xVzTkiGzquWl0Qk6lf2qg.QT8.hrmyDM8k3vu2Ft2geGRIf/nqrF.',
            userType: 1
        },
    ],
    student: [
        {
            id: 1,
            name: 'Noelia',
            lastName: 'Intriago',
            email: 'noinsanc@espol.edu.ec',
            password: '$2a$12$xVzTkiGzquWl0Qk6lf2qg.QT8.hrmyDM8k3vu2Ft2geGRIf/nqrF.',
            career: 'FIEC',
            userType: 2
        },
        {
            id: 2,
            name: 'Daniela',
            lastName: 'Landeta',
            email: 'dlandeta@espol.edu.ec',
            password: '$2a$12$xVzTkiGzquWl0Qk6lf2qg.QT8.hrmyDM8k3vu2Ft2geGRIf/nqrF.',
            career: 'FIEC',
            userType: 2
        },
        {
            id: 3,
            name: 'Yuma',
            lastName: 'Kim',
            email: 'ykim@espol.edu.ec',
            password: '$2a$12$xVzTkiGzquWl0Qk6lf2qg.QT8.hrmyDM8k3vu2Ft2geGRIf/nqrF.',
            career: 'FIMCP',
            userType: 2
        },
        {
            id: 4,
            name: 'Marco',
            lastName: 'Del Rosario',
            email: 'marsdel@espol.edu.ec',
            password: '$2a$12$xVzTkiGzquWl0Qk6lf2qg.QT8.hrmyDM8k3vu2Ft2geGRIf/nqrF.',
            career: 'FIEC',
            userType: 2
        },
        {
            id: 5,
            name: 'María',
            lastName: 'Rivera',
            email: 'marrcarr@espol.edu.ec',
            password: '$2a$12$xVzTkiGzquWl0Qk6lf2qg.QT8.hrmyDM8k3vu2Ft2geGRIf/nqrF.',
            career: 'FIEC',
            userType: 2
        },
    ],
    local: [
        {
            id: 1,
            name: 'Frutangas',
            faculty: 'FIMCP',
            latitude: -79.833120,
            longitude: -2.171288,
            score: 4.8,
            open_time: new Date("2023-02-26T08:30:00"),
            close_time: new Date("2023-02-26T16:30:00"),
            ownerId: 1
        },
        {
            id: 2,
            name: 'Pasteles del Chino',
            faculty: 'FIEC',
            latitude: -79.833120,
            longitude: -2.171288,
            score: 4.2,
            open_time: new Date("2023-02-26T08:30:00"),
            close_time: new Date("2023-02-26T16:30:00"),
            ownerId: 2
        },
        {
            id: 3,
            name: 'La carreta de Toño',
            faculty: 'FCSH',
            latitude: -79.833120,
            longitude: -2.171288,
            score: 4.0,
            open_time: new Date("2023-02-26T08:30:00"),
            close_time: new Date("2023-02-26T16:30:00"),
            ownerId: 3
        },
        {
            id: 4,
            name: 'Una Vaca Vestida de Uniforme',
            faculty: 'FCSH',
            latitude: -79.833120,
            longitude: -2.171288,
            score: 3.9,
            open_time: new Date("2023-02-26T08:30:00"),
            close_time: new Date("2023-02-26T16:30:00"),
            ownerId: 4
        },
    ],
    food: [
        {
            id: 1,
            price: 1.5,
            description: 'Sánduche',
            localId: 1
        },
        {
            id: 2,
            price: 0.75,
            description: 'Jugo de naranja',
            localId: 1
        },
        {
            id: 3,
            price: 1.0,
            description: 'Empanada',
            localId: 1
        },
        {
            id: 4,
            price: 1.25,
            description: 'Pastel de carne',
            localId: 2
        },
        {
            id: 5,
            price: 0.5,
            description: 'Agua',
            localId: 2
        },
        {
            id: 6,
            price: 1.0,
            description: 'Empanada de verde',
            localId: 2
        },
        {
            id: 7,
            price: 3.0,
            description: 'Taco normal',
            localId: 3
        },
        {
            id: 8,
            price: 2.25,
            description: 'Hamburguesa sencilla',
            localId: 3
        },
        {
            id: 9,
            price: 2.78,
            description: 'Hamburguesa completa',
            localId: 3
        },
        {
            id: 10,
            price: 2.0,
            description: 'Hamburguesa',
            localId: 4
        },
        {
            id: 11,
            price: 3.0,
            description: 'Hamburguesa vegetariana',
            localId: 4
        },
        {
            id: 12,
            price: 1.0,
            description: 'Churros',
            localId: 4
        },
    ],
    opinion: [
        {
            id: 1,
            score: 4,
            details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            localId: 1,
            studentId: 2
        },
        {
            id: 2,
            score: 2,
            details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            localId: 1,
            studentId: 3
        },
        {
            id: 3,
            score: 3,
            details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            localId: 2,
            studentId: 1
        },
        {
            id: 4,
            score: 5,
            details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            localId: 2,
            studentId: 5
        },
        {
            id: 5,
            score: 2,
            details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            localId: 3,
            studentId: 2
        },
        {
            id: 6,
            score: 4,
            details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            localId: 3,
            studentId: 3
        },
        {
            id: 7,
            score: 3,
            details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            localId: 4,
            studentId: 4
        },
        {
            id: 8,
            score: 3,
            details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            localId: 4,
            studentId: 1
        },
    ],
};