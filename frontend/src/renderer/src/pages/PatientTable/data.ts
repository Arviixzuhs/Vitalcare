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
  ],
  textArea: [
    {
      type: 'text',
      name: 'reasonEntry',
      label: 'Razón de ingreso',
      placeholder: 'Ingresa la razón de ingreso',
    },
    {
      type: 'text',
      name: 'reasonDeath',
      label: 'Razón de fallecimiento',
      placeholder: 'Ingresa la razón de fallecimiento',
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
