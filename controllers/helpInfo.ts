import {createContext, useContext} from 'react';

export const helpInfoInit = [
  {
    answer:
      'Soberana es una wallet donde puedes portar, ver, compartir, validar y solicitar documentos y credenciales digitales asociados a tu identidad digital. Estas credenciales, emitidas por gobiernos y otras organizaciones incluyen, entre otras cosas, tu información oficial.',
    id: '1',
    question: '¿Qué es Soberana?',
  },
  {
    answer:
      'Soberana te permite crear o importar tu identidad digital de manera auto-soberana, es decir, sin depender de ninguna autoridad central. Una vez con tu identidad digital en Soberana podrás interactuar con gobiernos y otras organizaciones para hacer trámites y solicitar tus credenciales.',
    id: '2',
    question: '¿Qué puedo hacer con Soberana?',
  },
  {
    answer:
      'Tu identidad digital es la versión en internet de tu identidad física como persona. Es un identificador compuesto de una llave pública y una privada que garantizan que seas único en internet. Parte fundamental de tu identidad son las credenciales que validan quién eres tú (tu certificado de nacimiento, tu título del colegio, universitario, etc.).',
    id: '3',
    question: '¿Qué es la/mi identidad digital?',
  },
  {
    answer:
      'Soberana trabaja sobre tecnología blockchain, la máxima tecnología de confianza. Tu identidad digital es equivalente a tener una billetera digital en blockchain y tus documentos digitales son el equivalente a las credenciales verificables libres de manipulación. Soberana es una wallet “non-custodial” por lo que no guardamos tus claves y eres soberano en el manejo de tu información.',
    id: '4',
    question: '¿Qué tan seguro y privado es Soberana?',
  },
  {
    answer:
      'En Soberana tus documentos se llaman credenciales verificables, son el equivalente digital, seguro y confiable de tus documentos oficiales y credenciales físicas, por ejemplo licencia de conducir, habilitación comercial, títulos de estudios, y todo documento en el que vincules a tu identidad digital. Es verificable porque cualquiera al que le compartas tu credencial, podrá verificarla online, sin la necesidad de recurrir a terceros para hacerlo.',
    id: '5',
    question: '¿Qué es una credencial verificable?',
  },
  {
    answer:
      'Debes entrar a la web de la organización pública o privada a la que quieres declararle tu identidad digital, ingresar con login o registrarte, y conectar Soberana. Para conectar Soberana debes abrir la app, y desde allí escanear el código QR que te muestra la web del gobierno u organización.',
    id: '6',
    question:
      '¿Cómo puedo vincular mi identidad digital a una organización o institución?',
  },
  {
    answer:
      'Una vez vinculada tu identidad digital a una organización o institución, tu primer documento lo recibirás en Soberana de manera automática, y será una credencial verificable de la vinculación entre tu identidad y la organización. Los próximos certificados que recibirás en Soberana, dependerán de los trámites o servicios que realices con cada institución.',
    id: '7',
    question: '¿Cómo obtengo mi primer documento?',
  },
  {
    answer:
      'Los organismos públicos o privados que estén conectados con Soberana y a los cuales vincules tu identidad digital.',
    id: '8',
    question:
      '¿Quiénes me otorgan o emiten documentos/credenciales asociados a mi identidad digital?',
  },
  {
    answer:
      'Soberana es una wallet pensada para que puedas guardar, ver, compartir, validar y solicitar todos tus documentos personales que estén o que quieras asociar a tu identidad digital. En esta primera etapa, solamente podrás guardar credenciales de los organismos que estén conectados a Soberana, pero en un futuro podrás vincular y portar otros documentos que decidas transformar en Credenciales Verificables.',
    id: '9',
    question: '¿Puedo guardar otros documentos que yo quiera?',
  },
  {
    answer:
      'La llave pública es tu identificador en blockchain, es tu identidad digital. Es un código único y es público, por lo que puedes compartirlo a organizaciones, instituciones y otras personas para que vinculen tus documentos, trámites y realizar todo tipo de transacciones digitales que quieras asociar a tu identidad.',
    id: '10',
    question: '¿Qué es una llave pública?',
  },
  {
    answer:
      'La llave privada es un código que solamente tú debes saber y guardar en uno o varios lugares seguros. NUNCA COMPARTAS TU LLAVE PRIVADA. Es la que permite que solo seas tú quien tenga acceso a toda tu información y documentos. Las 12 palabras que te brindamos es una forma más sencilla de guardar la llave privada, pero también solo tú debes acceder a ellas.',
    id: '11',
    question: '¿Qué es la llave privada?',
  },
  {
    answer:
      'Es la única manera en la que podrás resguardar tu información y acceder a ella solo tú. Si pierdes la llave y las 12 palabras, entonces perderás toda la información de la que disponías, y tendrás que gestionar con cada organización la emisión de nuevas credenciales, asociadas a una nueva identidad digital. Te recomendamos que copies la llave privada y las 12 palabras en un lugar seguro y al que solo tú tengas acceso. Soberana no puede restaurar tus datos ni llave privada si la pierdes.',
    id: '12',
    question: '¿Por qué debo guardar la llave privada y las 12 palabras?',
  },
  {
    answer:
      'Podrás guardarlas como y donde quieras. Te recomendamos que la registres en varios lugares: escrita en un papel, en un archivo con contraseña en tu dispositivo o en la nube, etc. Soberana te permite copiar en el portapapeles de tu dispositivo las claves. ¡Cópialas en algún lugar seguro antes de que te olvides!',
    id: '13',
    question: '¿Dónde guardo la llave privada y las 12 palabras?',
  },
  {
    answer:
      'Guardar tus llaves en un lugar seguro y en el que solo tú tengas acceso, es la única manera de que puedas recuperar tu wallet, es decir, tu identidad. Si no guardaste tu llave privada o tus 12 palabras, entonces nadie podrá recuperar tus datos y documentos personales, tampoco Soberana podrá hacerlo. Si las pierdes, entonces debes ingresar a la web de cada una de las organizaciones a las que estabas vinculado y declarar que has perdido tu identidad digital. Luego puedes crearte una nueva identidad digital con Soberana y volver a vincularla a tu sesión en la organización. ',
    id: '14',
    question: '¿Qué pasa si pierdo mi llave privada o mis 12 palabras?',
  },
  {
    answer:
      'Ese ícono rojo de alerta te indica que aún no has guardado tu llave privada y tus 12 palabras y que existe riesgo de que puedas perder toda tu información si te olvidas el pin de ingreso a Soberana o si pierdes el celular. Una vez que hayas guardado las claves en un lugar seguro, entonces ve a la alerta y declara que ya tu llave pública y 12 palabras están a resguardo.',
    id: '15',
    question: 'Me aparece un ícono de alerta rojo en la app, ¿qué debo hacer?',
  },
  {
    answer:
      'Puedes hacerlo, pero recuerda antes asegurarte de que guardaste tu llave privada y tus 12 palabras en un lugar seguro. Una vez que vuelvas a descargar Soberana, podrás recuperar tu wallet en la opción “Ya tengo wallet”: ingresa tu llave privada o las 12 palabras, y recuperarás tu identidad, junto con toda tu información, documentos y organizaciones vinculadas como si nada hubiese pasado.',
    id: '16',
    question: '¿Qué pasa si desinstalo Soberana en mi móvil?',
  },
  {
    answer:
      'No te preocupes, esa es la magia de que tengas una identidad autosoberana. Solo debes instalar Soberana en tu nuevo móvil e iniciar con la opción “Ya tengo wallet”. Allí podrás recuperar tu wallet escribiendo tu llave privada o tus 12 palabras, que son tu identidad, y con ella toda tu información, documentos y organizaciones vinculadas como si nada hubiese pasado.',
    id: '17',
    question: '¿Qué pasa si pierdo mi móvil?',
  },
];

export type helpInfoType = Array<{
  answer: string;
  id: string;
  question: string;
}>;

export type helpInfoProps = {
  helpInfo: helpInfoType;
  setHelpInfo: (helpInfo: helpInfoType) => void;
};

export const MyHelpInfoContext = createContext<helpInfoProps>({
  helpInfo: helpInfoInit,
  setHelpInfo: () => [],
});

export const useHelpInfoContext = () => useContext(MyHelpInfoContext);
