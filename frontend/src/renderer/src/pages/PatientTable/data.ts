export const columnsData = {
  columns: [
    { name: 'NOMBRE', uid: 'name' },
    { name: 'APELLIDO', uid: 'lastName' },
    { name: 'ID', uid: 'id' },
    { name: 'CEDULA', uid: 'CI' },
    { name: 'GÉNERO', uid: 'gender' },
    { name: 'EDAD', uid: 'age', sortable: true },
    { name: 'EMAIL', uid: 'email' },
    { name: 'ESTADO', uid: 'status', sortable: true },
    { name: 'ACCIÓN', uid: 'actions' },
  ],
  statusOptions: [
    { name: 'Vivo', uid: 'ALIVE' },
    { name: 'Fallecido', uid: 'DEAD' },
    { name: 'Masculino', uid: 'MALE' },
    { name: 'Femenino', uid: 'FEMALE' },
  ],
  InitialVisibleColumns: ['CI', 'age', 'role', 'name', 'gender', 'status', 'actions', 'lastName'],
}

export const modalInputs = {
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
      type: 'text',
      name: 'avatar',
      label: 'Avatar',
    },
  ],
  selectInputs: [
    {
      name: 'status',
      label: 'Estado del paciente',
      options: [
        { label: 'Vivo', value: 'ALIVE' },
        { label: 'Fallecido', value: 'DEAD' },
      ],
    },
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
