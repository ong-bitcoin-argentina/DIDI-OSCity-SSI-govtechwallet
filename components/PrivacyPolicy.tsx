import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
  Image,
  FlatList,
} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import {globalStyles} from '../config/styles';
import I18n from '../i18n/i18n';
interface Props {
  navigation: {
    navigate(destination: string): void;
    goBack: () => void;
  };
}
interface ItemProps {
  item: {
    id: string;
    title: string;
  };
}

const StatusBarConst = StatusBar.currentHeight || 100;
const StatusBarHeight = Platform.OS === 'ios' ? 20 : StatusBarConst;
const ScreenHeight = Dimensions.get('screen').height;

const USEDATA = [
  {
    id: '1',
    title:
      'Para el procesamiento de datos que permita crear un registro y solicitud de los Ciudadanos que requieren de los servicios de las Entidades Públicas ofrecidos a través de la Plataforma, como herramienta de enlace con el Ciudadano',
  },
  {
    id: '2',
    title:
      'Que la Entidad Pública pueda evaluar, administrar y cumplir con la solicitud de servicios requerida por el Ciudadano, y',
  },
  {
    id: '3',
    title:
      'De procesamiento de los datos bancarios para realizar el pago de los trámites solicitados ante las Entidades Públicas, a través de los motores de pago dispuestos por las Entidades Públicas',
  },
];

const DATA = [
  {id: '1', title: 'Nombre'},
  {id: '2', title: 'Fecha de nacimiento'},
  {
    id: '3',
    title:
      'Domicilio (incluyendo, número exterior e interior, nombre de calle, entre calles, colonia, municipio, ciudad, estado, código postal y señas particulares)',
  },
  {id: '4', title: 'Número de teléfono fijo y/o celular'},
  {id: '5', title: 'Clave Única de Registro de Población (“CURP”)'},
  {id: '6', title: 'Clave de Registro Federal de Contribuyentes (“RFC”)'},
  {
    id: '7',
    title:
      'Aquellos específicos para tramitar el tipo de documento requerido en los módulos dispuestos en la Plataforma, tales como: identidad, pasaporte y migración; educación; salud; trabajo; impuestos y contribuciones; seguridad, legalidad y justicia; programas sociales; energía; economía; territorio y vivienda; medio ambiente; comunicaciones y transportes; servicios financieros; y turismo',
  },
  {
    id: '8',
    title:
      'Documentos en formato digital necesarios para acreditar la personalidad y nacionalidad del Ciudadano, como pueden ser: Identificación oficial, comprobante de domicilio, acta de nacimiento, entre otros',
  },
  {
    id: '9',
    title:
      'Datos bancarios como forma de pago, que sean requisitos para iniciar o completar un trámite ante la Entidad Pública',
  },
];

export default function PrivacyPolicy({navigation}: Props) {
  const renderItem = ({item}: ItemProps) => {
    return <Text style={[styles.textList]}>• {item.title}</Text>;
  };
  const renderItemUse = ({item}: ItemProps) => {
    return (
      <Text style={[styles.text]}>
        {item.id} {item.title}
      </Text>
    );
  };

  return (
    <SafeAreaView style={globalStyles.backgroundContainer}>
      <View style={styles.statusBar}>
        <LinearGradient
          colors={['#3827B4', '#5120ac', '#6C18A4']}
          style={styles.containerGradient}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}>
          <StatusBar translucent={true} backgroundColor={'transparent'} />
          <View
            data-testid="pageTitle"
            style={[
              styles.pageTitle,
              {bottom: Platform.OS === 'ios' ? 40 : 20},
            ]}>
            <TouchableOpacity
              data-testid="backButton"
              style={styles.pageTitleButton}
              onPress={() => navigation.goBack()}>
              <Image
                style={[styles.iconBack, {width: 15, height: 15}]}
                source={require('../config/assets/regresar.png')}
              />
              <Text style={(globalStyles.fontBold, [styles.pageTitleText])}>
                {I18n.t('settings.privacyPolicy')}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      <View style={styles.container}>
        <Card style={styles.card}>
          <ScrollView>
            <Text style={[styles.title, globalStyles.fontBold]}>
              {I18n.t('settings.privacyPolicy')}
            </Text>
            <Text style={styles.text}>
              A fin de dar cumplimiento con lo establecido en la Ley Federal de
              Protección de Datos Personales en Posesión de los Particulares, su
              Reglamento y Lineamientos aplicables (la “Ley”), Onesmart
              Technology, S.A.P.I. de C.V., sus filiales y/o subsidiarias y/o
              sus partes relacionadas (“OS City”), con domicilio en Arnulfo S.
              Garza #300, int. 66, Colinas de San Jerónimo, Monterrey, Nuevo
              León, C.P. 64630, México, dirección electrónica: https://os.city/
              (el “Sitio”), titular de los derechos de la aplicación móvil
              denominada “Soberana” y demás plataformas presentes y futuras de
              su propiedad, y con correo electrónico de contacto info@os.city
              (el “Correo Electrónico”), pone a su disposición el presente:
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              AVISO DE PRIVACIDAD
            </Text>
            <Text style={styles.text}>
              Con la finalidad de dar un tratamiento legítimo, controlado e
              informado a sus datos personales, que actualmente nos proporcione
              o en el futuro y que obren en nuestras bases de datos, o que hayan
              sido recopilados por cookies, o cualquier otra tecnología de
              seguimiento web, así como para garantizar su privacidad y su
              derecho a la autodeterminación informativa al proporcionarnos
              dichos datos, siendo OS City responsable del uso y protección de
              sus datos personales los cuales serán tratados con base en los
              principios de licitud, consentimiento, información, calidad,
              finalidad, lealtad, proporcionalidad y responsabilidad previstos
              en la Ley.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              UTILIZACIÓN DE LA INFORMACIÓN
            </Text>
            <Text style={styles.text}>
              La información que usted nos provea a través del acceso, registro
              y creación de perfil de Usuario en el Sitio y/o en la Plataforma,
              y/o correo electrónico, y/o llenado de formularios o encuestas
              físicas o electrónicas, en tiempo real o histórico, se procesará y
              ordenará, para que genere indicadores de datos, mismos que OS City
              podrá usar para tomar decisiones pertinentes a su negocio. Toda la
              información que sea recopilada se utilizará con fines
              estadísticos, de manera genérica y no personalizada, y se asocian
              con el crecimiento, mantenimiento y administración de OS City,
              respetando en todo momento su privacidad. Estos usos incluyen
              nuestras operaciones y administración internas, la comunicación
              con usted y el cumplimiento de las solicitudes de servicios y/o
              productos provistos por OS City, así como para mejorar,
              desarrollar, perfeccionar y, proporcionar los servicios de OS
              City, a través de sus partes relacionadas, filiales, o proveedores
              autorizados y/o socios comerciales, estableciendo las medidas
              adecuadas a fin de limitar el uso de la información recabada de
              usted, únicamente para fines legales y autorizados de conformidad
              con este Aviso, así como con las debidas medidas de
              confidencialidad y seguridad.
            </Text>
            <Text style={styles.text}>
              OS City también podrá recabar su dirección de IP (Internet
              Protocol) para ayudar a diagnosticar problemas con el servidor de
              OS City y para administrar el Sitio y la Plataforma. Una dirección
              de IP es un número que se le asigna a su computadora cuando usa
              Internet. Su dirección de IP también es utilizada para ayudar a
              identificarle dentro de una sesión particular y para recolectar
              información demográfica general. OS City podrá hacer uso de
              tecnología “push” a través de la aplicación que OS City usa para
              enviar notificaciones con autorización previa del Usuario. Este
              medio de comunicación no tiene ningún tipo de acceso a otras
              funciones o información del equipo con el que se conecta al Sitio.
              La información puede incluir la URL de la que provienen (estén o
              no en el Sitio), a qué URL acceden seguidamente (estén o no en el
              Sitio), qué navegador están usando, así como también las páginas
              visitadas, las búsquedas realizadas, las publicaciones,
              preferencias comerciales, mensajes, etc.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              1. DATOS PERSONALES SOLICITADOS
            </Text>
            <Text style={styles.text}>
              OS City, y/o las empresas controladoras de éste y/o empresas
              filiales y/o subsidiarias y/o partes relacionadas y/o aquellos
              terceros que, por la relación comercial con OS City hayan
              contratado el uso de la Plataforma o Aplicación para complementar
              su propuesta de negocios y tengan la necesidad de tratar y/o
              utilizar sus datos personales (“Cliente” o “Entidades Públicas”
              indistintamente), solicita y obtiene datos personales en general,
              así como datos personales considerados sensibles por la Ley (en lo
              sucesivo “Datos Personales Generales” y “Datos Personales
              Sensibles”, respectivamente; y de manera conjunta referidos como
              los “Datos Personales”) de las personas en adelante descritas.
            </Text>
            <Text style={styles.text}>
              Los Datos Personales Sensibles podrán ser solicitados por medios
              electrónicos o físicos, en el entendido de que toda información
              proporcionada en físico, será considerada y tratada como si se
              hubiera proporcionado y autorizado en el Sitio, y por lo cual se
              regirá por el presente documento.
            </Text>
            <Text style={styles.text}>
              En todos los casos, la recolección de Datos Personales por parte
              de OS City es realizada de buena fe y para los fines aquí
              expuestos; por tal motivo, se presume que los datos proporcionados
              por sus titulares son apegados a la verdad y completos, por lo que
              son responsabilidad del titular que los proporciona.
            </Text>
            <Text style={styles.text}>
              Los Datos Personales que serán recabados de los Usuarios de la
              Plataforma, ya sea como Entidades Públicas o sus Administradores
              (como las personas físicas que representan a la Entidad Pública y
              responsables del procesos de solicitud, selección y adquisición de
              los servicios de la Plataforma, así como de la administración de
              los servicios e información que se brinde a los Ciudadanos a
              través de la Plataforma), o aquellas personas físicas y/o morales
              interesados en realizar algún trámite o solicitar un servicio ante
              las Entidades Públicas (“Ciudadanos”) a través del uso de la
              Plataforma o Aplicación, constan de información personal que es
              incluida o podrá ser incluida en formatos, listados, bases de
              datos u otros medios físicos y/o electrónicos, según corresponda,
              a efecto de que OS City pueda proveer de los servicios de la
              Plataforma y consolidar el catálogo de trámites y servicios que
              ofrecen las Entidades Públicas a los Ciudadanos a través de la
              Plataforma .
            </Text>
            <Text style={styles.text}>
              CIUDADANOS COMO USUARIOS DE LA PLATAFORMA o APLICACIÓN. Los Datos
              Personales que el Ciudadano proporcionará voluntaria y libremente
              a mediante la Plataforma o Aplicación, constan de información que
              es incluida o podrá ser incluida en contratos, cartas, formatos,
              listados, bases de datos u otros medios físicos y/o electrónicos
              dispuestos en los Módulos de la Plataforma según corresponda, a
              efecto de que OS City pueda documentar el proceso de uso y
              selección que realice o vaya a realizar de los Módulos que
              conforman la Plataforma o Aplicación; pueda llevar un registro
              adecuado de la relación comercial con los Ciudadanos como usuarios
              finales de las Entidades Públicas que hagan uso de la Plataforma;
              así como para dar cabal cumplimiento a las políticas internas,
              procedimientos y demás obligaciones legales aplicables a OS City.
            </Text>
            <Text style={styles.text}>
              Los Datos Personales que podrán ser solicitados al Ciudadano son:
            </Text>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
            <Text style={styles.text}>
              Todos los Datos Personales de los Ciudadanos son procesados por OS
              City y puestos en un repositorio para uso, manejo y administración
              exclusivo de la Entidad Pública. Al ser la Plataforma una
              herramienta de procesamiento de datos puesta al servicio de la
              Entidad Pública, para a su vez configurar y brindar un servicio a
              los Ciudadanos, OS City no tiene injerencia sobre éstos, por lo
              que el tratamiento de los mismos estarán regidos por el Aviso de
              Privacidad que cada Entidad Pública disponga a este efecto.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              2. FINALIDADES DEL TRATAMIENTO DE LOS DATOS PERSONALES
            </Text>
            <Text style={styles.text}>
              Los Datos Personales proporcionados a OS City a través de la
              Plataforma serán utilizados según se ha mencionado anteriormente,
              con la finalidad de:
            </Text>
            <FlatList
              data={USEDATA}
              renderItem={renderItemUse}
              keyExtractor={item => item.id}
            />
            <Text style={styles.text}>
              Una vez cumplidas las finalidades del tratamiento de sus Datos
              Personales, y cuando no exista disposición legal que establezca lo
              contrario, OS City procederá a la cancelación, eliminación y/o
              destrucción de los Datos Personales recibidos, en los términos
              establecidos por la Ley.
            </Text>
            <Text style={styles.text}>
              El tratamiento que las Entidades Públicas como los motores de pago
              otorguen a los Datos Personales brindados por los Ciudadanos,
              estarán sujetos a los términos y condiciones del Aviso de
              Privacidad de las Entidades Públicas como aquellos contenidos en
              la página web del tercero que realice los servicios de motor de
              pago.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              3. TRANSFERENCIA
            </Text>
            <Text style={styles.text}>
              TRANSFERENCIA DE LOS DATOS PERSONALES E INFORMACIÓN. Los Datos
              Personales e Información de los Ciudadanos recabados a través de
              la Plataforma serán procesados y transferidos a las Entidades
              Públicas u organizaciones con las que OS City tenga una relación
              jurídica y contractual, como fuente principal de información para
              ejecutar los servicios que dichas Entidades Públicas le ofrecen
              directamente al Ciudadano.
            </Text>
            <Text style={styles.text}>
              De igual forma, OS City podrá transferir la misma a (i) terceros
              (como empresas controladoras de OS City y/o empresas filiales y/o
              subsidiarias y/o partes relacionadas) y/o aliados comerciales que
              hayan celebrado un contrato con la finalidad de ofrecer y promover
              productos y/o servicios de dicho tercero a través de la Plataforma
              (por ejemplo servicios de soporte técnico); (ii) autoridades
              judiciales, mexicanas y extranjeras, con la finalidad de dar
              cumplimiento a la Ley, legislación, notificaciones, requerimientos
              u oficios de carácter judicial; (iii) a proveedores de servicios
              de internet sobre la cual esté montada la Plataforma o
              infraestructura tecnológica de OS City. En caso de realizar alguna
              transferencia de sus Datos Personales, en los que se requiera su
              consentimiento expreso, se lo informaremos a efecto de recabar el
              mismo.
            </Text>
            <Text style={styles.text}>
              En todos los casos, OS City comunicará el presente Aviso de
              Privacidad a estos terceros y se asegurará a través de la firma de
              convenios y/o la adopción de otros documentos vinculantes, que
              dichos terceros mantengan las medidas de seguridad
              administrativas, técnicas y físicas necesarias para resguardar sus
              Datos Personales, así como que dichos terceros únicamente utilicen
              sus Datos Personales para las finalidades para los cuales fueron
              recabados. Asimismo, tanto las Entidades Públicas como responsable
              de recabar los Datos Personales y OS City que facilita a través de
              la Plataforma la recabación y procesamiento de los mismos, así
              como cualquier otra persona relacionada con Os City que tenga
              acceso a la información contenida en este Aviso de Privacidad,
              quedarán obligados a resguardarla bajo las mismas normas de
              seguridad y confidencialidad, y a no revelarla ni hacer mal uso de
              la misma, o en caso contrario serán responsables de conformidad
              con las leyes aplicables.
            </Text>
            <Text style={styles.text}>
              No obstante lo anterior, OS City no transferirá sus Datos
              Personales a terceros no relacionados con Os City, salvo en los
              casos antes citados y los previstos en la Ley, sin su
              consentimiento previo.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              4. MEDIOS Y PROCEDIMIENTOS PARA EL EJERCICIO DE LOS DERECHOS ARCO
            </Text>
            <Text style={styles.text}>
              Usted, como titular de los Datos Personales proporcionados a OS
              City, podrá solicitar en cualquier momento, el ejercicio de sus
              derechos de acceso, rectificación, cancelación u oposición (los
              “Derechos ARCO”) al tratamiento de sus Datos Personales,
              consistentes en: (i) acceder a sus Datos Personales y a los
              detalles del tratamiento de los mismos; (ii) rectificar sus Datos
              Personales en caso de ser inexactos o incompletos; (iii) cancelar
              sus Datos Personales cuando considere que no se requieren para
              alguna de las finalidades señalados en este Aviso de Privacidad,
              estén siendo utilizados para finalidades no consentidas o haya
              finalizado su relación contractual o de servicio u otra con OS
              City; y (iv) oponerse al tratamiento de sus Datos Personales para
              fines específicos.
            </Text>
            <Text style={styles.text}>
              Para tal fin, usted deberá seguir el proceso de presentar su
              petición por escrito a OS City, o bien, enviar su petición al
              Correo Electrónico, según sea aplicable, la cual deberá contener,
              como mínimo, la siguiente información: (a) su nombre completo y
              domicilio, u otro medio idóneo para comunicarle la respuesta a su
              solicitud; (b) los documentos que acrediten su identidad o, en su
              caso, la de su representante legal; (c) la descripción clara y
              precisa de los Datos Personales respecto de los que se busca
              ejercer alguno de los derechos antes mencionados; y (d) cualquier
              otro elemento o información que facilite la localización de los
              Datos Personales, así como cualquier otro documento requerido por
              la regulación actual en el momento de presentar la solicitud.
              Usted también podrá solicitar al Correo Electrónico mayor
              información sobre el procedimiento para ejercer sus Derechos ARCO.
            </Text>
            <Text style={styles.text}>
              La respuesta a su solicitud le será dada a conocer por OS City en
              los términos y plazos establecidos en la Ley. No obstante, usted
              podrá obtener más información acerca del estado que guarda su
              solicitud y del plazo de respuesta de la misma, contactando a OS
              City o enviando su petición al Correo Electrónico, donde además
              podrán atender cualquier aclaración o duda que pudiera tener
              respecto al tratamiento de sus Datos Personales y el ejercicio de
              sus Derechos ARCO.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              5. REVOCACIÓN DEL CONSENTIMIENTO; LIMITACIÓN DE USO Y DIVULGACIÓN
              DE LOS DATOS PERSONALES
            </Text>
            <Text style={styles.text}>
              Usted también podrá revocar, en cualquier momento, el
              consentimiento que haya otorgado a OS City para el tratamiento de
              sus Datos Personales, así como solicitar que se limite el uso y
              divulgación de los mismos, siempre y cuando no lo impida una
              disposición legal. Para tal fin, usted deberá presentar su
              solicitud por escrito a OS City, o bien, enviar su solicitud al
              Correo Electrónico, según sea aplicable. Dicha solicitud deberá
              cumplir con los mismos requisitos mencionados en la Sección 4.
              anterior.
            </Text>
            <Text style={styles.text}>
              La respuesta a su solicitud le será dada a conocer por OS City en
              los términos y plazos establecidos en la Ley. No obstante, usted
              podrá obtener más información acerca del estado que guarda su
              solicitud y del plazo de respuesta de la misma, contactando a OS
              City o enviando su petición al Correo Electrónico, donde además
              podrán atender cualquier aclaración o duda que pudiera tener
              respecto al tratamiento y estos derechos que le corresponden
              respecto a sus Datos Personales.
            </Text>
            <Text style={styles.text}>
              En caso de que sus Datos Personales hubiesen sido remitidos con
              anterioridad a la fecha de revocación del consentimiento, y sigan
              siendo tratados por encargados de OS City, éste hará del
              conocimiento de éstos últimos dicha revocación, para que procedan
              a efectuar lo conducente.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              6. CAMBIOS AL AVISO DE PRIVACIDAD
            </Text>
            <Text style={styles.text}>
              OS City se reserva el derecho de modificar y/o actualizar este
              Aviso de Privacidad, en alguna o todas sus partes, a su entera
              discreción, en cuyo caso lo comunicará aquí mismo a través de su
              Sitio y/o la Plataforma; y, según sea el caso particular de cada
              titular, a través de sus redes internas, o por medio de un aviso
              que se colocará en los medios habituales (físicos o electrónicos)
              de comunicación de OS City y en un lugar visible del Domicilio, o
              mediante un aviso por escrito dirigido a su correo electrónico,
              según sea legalmente requerido.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              7. FORMA DIGITAL, ELECTRÓNICA O EN LÍNEA
            </Text>
            <Text style={styles.text}>
              La Partes acuerdan que la forma para perfeccionar el acuerdo de
              voluntades entre ellas podrá ser el de formato Digital,
              Electrónico o en Línea, en donde bastará manifestar su voluntad
              por medio de su aceptación, así como proporcionar los datos
              personales, en el propio Sitio de OS City o Aplicación "Soberana"
              sin requerir estampar la firma en documento alguno.
            </Text>
            <Text style={styles.text}>
              Fecha de última revisión: 16/12/2021
            </Text>
            <TouchableOpacity
              data-testid="nextButton"
              style={[styles.nextButton, {marginBottom: 15}]}
              onPress={() => {
                navigation.navigate('Settings');
              }}>
              <LinearGradient
                colors={['#3827B4', '#5120ac', '#6C18A4']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
                style={[styles.nextButton]}>
                <Text style={[styles.textButton, globalStyles.fontRegular]}>
                  Aceptar
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 27,
    margin: 15,
    borderRadius: 15,
    height: ScreenHeight - 150,
  },
  statusBar: {
    height: StatusBarHeight + 80,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerGradient: {
    paddingLeft: 25,
    height: '100%',
  },
  pageTitleButton: {
    flexDirection: 'row',
  },
  pageTitle: {
    position: 'absolute',
    left: 20,
  },
  pageTitleText: {
    color: 'white',
    fontSize: 15,
    paddingLeft: 10,
  },
  title: {
    color: '#404040',
    fontSize: 20,
    marginBottom: 25,
    alignSelf: 'center',
  },
  subtitle: {
    color: '#404040',
    fontSize: 14,
    marginBottom: 11,
    alignSelf: 'flex-start',
  },
  iconBack: {
    marginTop: 3,
  },
  text: {
    color: '#9DA1B2',
    lineHeight: 22,
    paddingBottom: 20,
    fontSize: 14,
    textAlign: 'justify',
  },
  textList: {
    color: '#9DA1B2',
    paddingBottom: 7,
    fontSize: 14,
    textAlign: 'justify',
  },
  nextButton: {
    width: '100%',
    textAlign: 'center',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: 38,
  },
  textButton: {
    color: 'white',
    fontSize: 15,
  },
});
