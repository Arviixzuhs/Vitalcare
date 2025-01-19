export const columnsData = {
  columns: [
    { name: 'NOMBRE', uid: 'name' },
    { name: 'APELLIDO', uid: 'lastName' },
    { name: 'ID', uid: 'id' },
    { name: 'CEDULA', uid: 'CI' },
    { name: 'GÉNERO', uid: 'gender' },
    { name: 'EDAD', uid: 'age', sortable: true },
    { name: 'EMAIL', uid: 'email' },
    { name: 'TELEFONO', uid: 'phone' },
    { name: 'DIRECCION', uid: 'address' },
    { name: 'CARGO NOMINAL', uid: 'cargoNominal' },
    { name: 'DEPENDENCIAS', uid: 'dependencias' },
    { name: 'TALLA CAMISAS', uid: 'tallaCamisas' },
    { name: 'EGRESADOS', uid: 'egresados' },
    { name: 'NUMERO DE HIJOS', uid: 'numeroHijos' },
    { name: 'PLACA DEL CARRO', uid: 'placaCarro' },
    { name: 'JUBILADOS', uid: 'jubilados' },
    { name: 'ACCIÓN', uid: 'actions' },
  ],
  statusOptions: [
    { name: 'Masculino', uid: 'MALE' },
    { name: 'Femenino', uid: 'FEMALE' },
  ],
  InitialVisibleColumns: [
    'name',
    'lastName',
    'id',
    'CI',
    'gender',
    'age',
    'phone',
    'actions',
    /*  'address',
      'email',
      'cargoNominal',
      'dependencias',
      'tallaCamisas',
      'egresados',
      'numeroHijos',
      'placaCarro',
      'jubilados', */
  ],
}

/* Datos de los inputs del modal para crear usuarios */
export const modalInputs = {
  selectAvatar: true,
  inputs: [
    {
      type: 'text',
      name: 'name',
      label: 'Nombre',
      isRequired: true,
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Apellido',
      isRequired: true,
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      isRequired: true,
    },
    {
      type: 'number',
      name: 'CI',
      label: 'Cédula',
      isRequired: true,
    },
    {
      type: 'number',
      name: 'age',
      label: 'Edad',
      isRequired: true,
    },
    {
      type: 'phone',
      name: 'phone',
      label: 'Teléfono',
      isRequired: true,
    },
    {
      type: 'text',
      name: 'address',
      label: 'Dirección',
      isRequired: true,
    },
    {
      type: 'text',
      name: 'cargoNominal',
      label: 'Cargo nominal',
    },
    {
      type: 'text',
      name: 'dependencias',
      label: 'Dependencias',
    },
    {
      type: 'text',
      name: 'tallaCamisas',
      label: 'Talla de camisa',
    },
    {
      type: 'text',
      name: 'egresados',
      label: 'Egresados',
    },
    {
      type: 'text',
      name: 'numeroHijos',
      label: 'Numero de hijos',
    },
    {
      type: 'text',
      name: 'placaCarro',
      label: 'Placa del carro',
    },
    {
      type: 'text',
      name: 'jubilados',
      label: 'Jubilados',
    },
  ],
  selectInputs: [
    {
      name: 'gender',
      label: 'Género',
      options: [
        { label: 'Masculino', value: 'MALE' },
        { label: 'Femenino', value: 'FEMALE' },
      ],
    },
  ],
}
