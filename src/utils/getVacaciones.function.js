export const getVacaciones = (salario) => {
  let vaca = 0.0;
  
  vaca=(((salario/30)*15)*0.3)+((salario/30)*15)

  return vaca.toFixed(2);
};
