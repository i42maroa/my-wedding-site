export const textSomosOrSoy = (names:string[]) => 
    names.length > 1 ? 'somos ': 'soy ';

export  const textConfirmamosOrConfirmo = (names:string[]) => 
    names.length > 1 ? 'Confirmamos': 'Confirmo';

export  const userNames = (names:string[]) => 
    names.length === 1 ? names[0] : names.slice(0, -1).join(', ') + ' y ' + names[names.length - 1];
