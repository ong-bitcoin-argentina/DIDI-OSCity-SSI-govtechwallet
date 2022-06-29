import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import {globalStyles} from '../config/styles';
import {Card} from 'react-native-shadow-cards';
import I18n from '../i18n/i18n';
interface Props {
  navigation: {
    navigate(destination: string): void;
    goBack: () => void;
  };
}

const StatusBarConst = StatusBar.currentHeight || 100;
const StatusBarHeight = Platform.OS === 'ios' ? 20 : StatusBarConst;
const ScreenHeight = Dimensions.get('screen').height;

function TermsAndConditions({navigation}: Props) {
  return (
    <SafeAreaView>
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
                {I18n.t('settings.termsAndConditions')}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      <View style={styles.container}>
        <Card style={styles.card}>
          <ScrollView>
            <Text style={[styles.title, globalStyles.fontBold]}>
              {I18n.t('settings.termsAndConditions')}
            </Text>
            <Text style={styles.text}>
              Soberana es un servicio de One Smart Technology (OS City), que
              proporciona una plataforma para la gestión de la identidad digital
              a través de una interfaz de programación de aplicaciones (API)
              para gobierno y una aplicación móvil para el ciudadano. La
              aplicación móvil Soberana incluye texto, imágenes, audio, código y
              otros materiales o aplicaciones de terceros accesible a través de
              la aplicación Soberana (colectivamente, con el Sitio, el
              "Contenido"). La API, la aplicación móvil y cualquier otra
              característica, herramienta, material u otros servicios ofrecidos
              por OS City se denominan aquí como el "Servicio"
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              1. Aceptación de los términos
            </Text>
            <Text style={styles.text}>
              Lea atentamente estos Términos de uso (los "Términos") antes de
              utilizar el servicio. Al usar o acceder a los Servicios, o al
              hacer clic para aceptar estos Términos, usted acepta: (a) estos
              Términos (b) consentimiento para la recopilación, uso, divulgación
              y otros manejo de la información como se describe en nuestra
              Política de Privacidad y (c) aceptar los términos, reglas y
              condiciones adicionales de participación emitida por Soberana. Si
              no está de acuerdo con ninguna de las disposiciones de estos
              Términos, nuestra Privacidad Política o los Términos del proveedor
              de servicios, debe detener de inmediato utilizando los Servicios.
              Le animamos a leer estos documentos cuidadosamente y utilícelos
              para tomar decisiones informadas.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              2. Modificación de Términos
            </Text>
            <Text style={styles.text}>
              OS City se reserva el derecho de cambiar o modificar estos
              Términos en en cualquier momento y a nuestro exclusivo criterio.
              La versión más actual de estos Términos se publicarán en nuestro
              Sitio. Usted será responsable de revisar y familiarizarse con
              dichas modificaciones. Uso de los Servicios por su parte después
              de cualquier modificación de los Términos, constituye su
              aceptación de los Términos modificados.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              3. Elegibilidad
            </Text>
            <Text style={styles.text}>
              Por la presente declara y garantiza que es plenamente capaz y
              competente para entrar en los términos, condiciones, obligaciones,
              afirmaciones, representaciones y garantías establecidas en estos
              Términos y cumplir con estos Términos. Accediendo al Contenido o
              Servicios, usted declara y garantiza que es del mayoría de edad
              legal en su jurisdicción o de la edad requerida para acceder a
              dichos Servicios y Contenido. Además, declara que tiene permitido
              legalmente usar el servicio en su jurisdicción, incluida la
              posesión de tokens criptográficos de valor, y interactuar con los
              Servicios o el Contenido de cualquier manera. Usted declara que es
              responsable de garantizar el cumplimiento de las leyes de su
              jurisdicción y reconoce que Soberana no es responsable por su
              cumplimiento de dichas leyes.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              4. Preferencias de registro, cuenta y comunicación
            </Text>
            <Text style={styles.text}>Registro.</Text>
            <Text style={styles.text}>
              Para acceder y utilizar determinadas áreas o funciones del
              Servicios, deberá registrarse para obtener una cuenta de Soberana.
              Al crear una cuenta, usted acepta (a) proporcionar información
              precisa, actualizada e información completa de la cuenta sobre
              usted, (b)mantener y actualizar puntualmente, según sea necesario,
              su información de la cuenta, (c) mantener la seguridad de su
              cuenta, credenciales, claves, reconocimiento biométrico o
              cualquier otro código que utilizar para acceder a su cuenta y a
              los Servicios, (d) aceptar todos los riesgos de acceso no
              autorizado a su cuenta y a la información que proporcionarnos, y
              (e) notificarnos inmediatamente si descubre o sospechar de
              cualquier otra forma cualquier violación de seguridad relacionada
              con los Servicios o tu cuenta. Usted es responsable de todo el uso
              de los Servicios que ocurren bajo su cuenta.
            </Text>
            <Text style={styles.text}>Cuenta.</Text>
            <Text style={styles.text}>
              No seremos responsables de seguir ninguna instrucción que
              recibamos a través de su cuenta, incluso si no fue autorizado por
              usted, o si se ingresó por error o es inexacto. Para verificar el
              autenticidad de cualquier instrucción que recibamos a través de su
              cuenta, puede requerir su firma o identificación en cualquier
              forma que consideremos necesario; a nuestro exclusivo criterio,
              podemos aceptar imágenes digitales y firmas electrónicas para
              documentos que necesitan ser firmados. Usted acepta (i)
              indemnizar, defender y eximirnos de toda responsabilidad por todas
              las reclamaciones, costos, pérdidas y daños, incluidos los
              honorarios razonables de abogados, que resultan de nuestro
              seguimiento de sus instrucciones para tomar cualquier acción
              relacionada con su cuenta, y (i) podemos cargar su cuenta por
              todos y cada uno de dichos reclamos, costos, pérdidas y daños
              incurridos por nosotros.
            </Text>
            <Text style={styles.text}>Comunicación.</Text>
            <Text style={styles.text}>
              Al crear una cuenta en Soberana, también acepta recibir
              comunicaciones electrónicas de OS City (por ejemplo, por correo
              electrónico o por publicar avisos en los Servicios). Estas
              comunicaciones pueden incluir avisos sobre su cuenta y son parte
              de su relación con nosotros. Usted acepta que cualquier aviso,
              acuerdo, divulgación u otro comunicaciones que le enviemos
              electrónicamente satisfarán cualquier requisitos legales de
              comunicación, incluyendo que Dichas comunicaciones se harán por
              escrito. Debe mantener copias de comunicaciones electrónicas de
              nuestra parte imprimiendo una copia en papel o guardar una copia
              electrónica. También podemos enviarle promociones comunicaciones
              por correo electrónico, incluidos boletines informativos, ofertas
              especiales, encuestas y otras noticias e información que creemos
              serán de interés para ti. En cualquier momento puede optar por no
              participar recibir estos correos electrónicos promocionales
              siguiendo las instrucciones para cancelar la suscripción
              instrucciones proporcionadas en el mismo.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              5. Contraseña de cuenta, seguridad e identificadores
              descentralizados (DID)
            </Text>
            <Text style={styles.text}>Registro.</Text>
            <Text style={styles.text}>
              Al configurar una cuenta dentro de Soberana, será responsable de
              mantener la frase secreta de su propia cuenta en privado. Estas
              frases semilla pueden incluir su clave privada de recuperación, un
              frase de doce palabras (mnemónico) u otras características de
              seguridad. Usted reconoce su entendimiento de que cualquier
              persona con conocimiento de su frase semilla puede generar sus
              claves privadas. Usted reconoce que Soberana no es propietario de
              sus claves privadas o de la frase semilla. Soberana no tiene la
              capacidad de recuperar sus claves privadas o tu frase semilla en
              caso de que se pierdan.
            </Text>
            <Text style={styles.text}>Seguridad.</Text>
            <Text style={styles.text}>
              Su clave privada, correspondiente a su dirección de identidad
              pública es almacenada en el llavero controlado por el "enclave
              sequro" de su dispositivo. Deberá actualizar periódicamente el
              sistema operativo de su dispositivo con cualquier software o
              actualizaciones de seguridad. A pesar de lo anterior, reconoce que
              la aplicación Soberana, que existe fuera del "enclave seguro",
              cuando lo inicia el Usuario, utiliza la información de la clave
              privada almacenada en el llavero para actividades de firma. Su
              clave privada permanece dentro de Soberana y OS City no envía la
              clave privada a los servidores. Usted está de acuerdo para (a)
              mantener la confidencialidad de su información secreta y no
              compartir con cualquier otra persona; (b) no comparta su frase
              semilla con nadie y almacenarlo de manera segura; y (c) notificar
              inmediatamente OS City de cualquier uso no autorizado de su cuenta
              o incumplimiento de seguridad. OS City no será responsable de
              ninguna pérdida o daños derivados de su incumplimiento de esta
              sección.
            </Text>
            <Text style={styles.text}>DID.</Text>
            <Text style={styles.text}>
              Al usar la aplicación Soberana, usted reconoce, acepta y da su
              consentimiento para la creación de un identificador
              descentralizado (DID) para usted. Un DID es esencialmente una
              dirección pública, una cadena que sirve como "Identificador". Tu
              DID, tal como está diseñado en Soberana, no está vinculada a su
              nombre natural o información personal, y OS City no recopila datos
              que permitan vincular ambos entre sí.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              6. Declaraciones, garantías y riesgos
            </Text>
            <Text style={styles.text}>6.1. Renuncia a la garantía.</Text>
            <Text style={styles.text}>
              Usted comprende y acepta expresamente que su uso del Servicio es
              bajo su propio riesgo. El Servicio (incluido el Servicio y el
              Contenido) se proporciona TAL CUAL Y como está disponible, sin
              garantías de ningún tipo, ya sean expresas o implícitas,
              incluyendo, sin limitación, garantías implícitas de
              comerciabilidad, idoneidad para un propósito particular o no
              infracción. Reconoce que OS City no tiene control y no hay
              obligación de tomar ninguna medida con respecto a: qué usuarios
              deciden acceder o utilizar el Servicio; qué efecto el contenido
              puede tener en usted; cómo puede interpretar o utilizar el
              Contenido; o que acciones tu puede tomar como resultado de haber
              estado expuesto al Contenido. Usted libera a OS City de toda
              responsabilidad por haber adquirido contenido a través del
              Servicio. OS City no hace representaciones relativas a cualquier
              contenido incluido en o al que se accede a través del Servicio, y
              no será responsable de la precisión, el cumplimiento de los
              derechos de autor, la legalidad o la decencia del material
              contenido en el Servicio o al que se accede a través de él.
            </Text>
            <Text style={styles.text}>
              6.2. Sofisticación y riesgo de los sistemas criptográficos.
            </Text>
            <Text style={styles.text}>
              Al utilizar el Servicio o interactuar con el Contenido en
              cualquier manera, usted declara y garantiza que comprende (a) la
              riesgos inherentes asociados con los sistemas criptográficos, y
              (b) la uso y complejidades de la criptografía de clave pública /
              privada, tokens nativos criptográficos, como Ether (ETH) y Bitcoin
              (BTC), tokens basados en contratos inteligentes como los que
              siguen al Ethereum Token Estándar
              (https://github.com/ethereum/EIPs/issues/20) y sistemas de
              software basados en blockchain.
            </Text>
            <Text style={styles.text}>
              6.3. Riesgo de acciones regulatorias en una o más jurisdicciones
            </Text>
            <Text style={styles.text}>
              Usted reconoce que, como tecnología emergente, LACChain, LACnet,
              Ethereum u otras cadenas de bloques que implementan la máquina
              virtual Ethereum (EVM) podría verse afectado por una o más
              consultas regulatorias o acciones reglamentarias, que podrían
              impedir o limitar la capacidad de OS City para continuar
              desarrollándose, o que podría impedir o limitar su capacidad para
              acceder o utilizar el Servicio o basado en EVM cadenas de bloques.
            </Text>
            <Text style={styles.text}>
              6.4. Riesgo de errores, errores y tiempo de inactividad
            </Text>
            <Text style={styles.text}>
              Usted reconoce y acepta que los Servicios (a) pueden contener
              errores y defectos, (b) puede funcionar incorrectamente o estar
              sujeto a períodos de tiempo de inactividad e indisponibilidad, (c)
              puede resultar en total o pérdida parcial o corrupción de los
              datos de la transacción, y (d) puede ser modificado en cualquier
              momento, incluso mediante la publicación de versiones, en cada
              caso con o sin previo aviso.
            </Text>
            <Text style={styles.text}>6.5 Pérdida total de datos</Text>
            <Text style={styles.text}>
              Usted reconoce que OS City no fabricó su dispositivo. La seguridad
              del enclave de seguridad de su dispositivo depende en el
              fabricante del dispositivo. Si tiene sospechas para creer que la
              seguridad del enclave de seguridad de su dispositivo ha sido
              comprometido, acepta detener el uso de Soberana y buscar
              asistencia directamente con el fabricante del dispositivo. Usted
              reconocer el riesgo de que si la seguridad o integridad de su el
              enclave de seguridad del dispositivo está comprometido, la
              seguridad de su la llave privada puede estar en riesgo. OS City no
              es propietaria ni opera los servidores de terceros utilizados para
              almacenar datos de identificación. La seguridad de los datos
              depende del propietario y operador del servidores de terceros.
              Reconoce que en caso de que la seguridad o la integridad de los
              servidores de terceros están comprometidas, sus datos de
              identificación pueden dañarse total o parcialmente y / o perderse.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              7. Certificaciones en blockchain y el servicio de credenciales de
              Soberana
            </Text>
            <Text style={styles.text}>
              Los Servicios pueden, de vez en cuando, permitir varios
              atestaciones que se realizarán sobre un usuario. A menos que se
              especifique lo contrario, estas certificaciones son realizadas de
              forma independiente por terceros (gobiernos, universidades u
              organizaciones en general). OS City no representa ni garantiza la
              veracidad o exactitud de estas atestaciones de terceros. Las
              atestaciones de terceros pueden estar sujetas a las partes que
              certifican. En algunos casos, certificaciones de terceros se puede
              realizar a través del Servicio de Credenciales de OS City
              ("Credenciales Verificables"). La plataforma de OS City permite
              que un tercero realice una atestación sobre un usuario en
              particular sin ese tercero haciendo directamente la atestación. OS
              City no hace ninguna representación como la veracidad o exactitud
              de las atestaciones realizadas a través de Soberana o la
              plataforma de OS City, y por la presente renuncia explícitamente a
              cualquier y toda responsabilidad relacionada con el uso de las
              credenciales para cualquier propósito. OS City le permite optar
              afirmativamente y elegir enviar y almacenar una copia encriptada
              de todos sus reclamos, atestaciones y las asociaciones
              correspondientes de esa información ("Datos de identificación")
              para su cuenta que está almacenada en un servicio que es mantenido
              por OS City y se ejecuta en servidores e infraestructura de
              propiedad y operado por proveedores externos. Esto significa que
              tendrás la capacidad de recuperar datos de identificación, pero
              solo después de restaurar las claves a sus datos de identificación
              de su semilla. OS City no hace una copia de seguridad de las
              claves privadas, solo datos de identificación. Al optar por usar
              los Servicios, no solo tiene la capacidad de hacer una copia de
              seguridad de sus datos de identificación, sino también puede
              eliminar todos los datos en los servidores de terceros
              administrados de código abierto de Soberana de dentro de la
              aplicación móvil. Usted reconoce que OS City no es responsable de
              la seguridad o integridad del servidores gestionados por terceros.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              8. Indemnidad
            </Text>
            <Text style={styles.text}>
              Usted acepta liberar y mantener indemne a OS City y sus matrices,
              subsidiarias, afiliadas y agencias, así como los funcionarios,
              directores, empleados, accionistas y representantes de cualquiera
              de las entidades anteriores, de y contra todas y cada una de las
              pérdidas, pasivos, gastos, reclamaciones por daños, costos
              (incluidos los honorarios de abogados y costas judiciales) o
              acciones de cualquier tipo que surjan o resulten de su uso del
              Servicio, su violación de estos Términos de Uso y cualquiera de
              sus actos u omisiones que impliquen derechos de publicidad,
              difamación o invasión de la privacidad. OS City se reserva el
              derecho, a sus propias expensas, de asumir la defensa y el control
              exclusivos de cualquier asunto sujeto a indemnización por su parte
              y, en en tal caso, acepta cooperar con OS City en la defensa de
              tal materia.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              9. Limitación de responsabilidad
            </Text>
            <Text style={styles.text}>
              USTED RECONOCE Y ACEPTA QUE ASUME LA RESPONSABILIDAD TOTAL DE SU
              USO DE LA APLICACIÓN Y SERVICIO. USTED RECONOCE Y ACEPTA QUE
              CUALQUIER INFORMACION QUE ENVIE O RECIBA DURANTE EL USO DE LA
              APLICACIÓN Y EL SERVICIO PUEDE NO SER SEGURO Y PUEDE SER
              INTERCEPTADO POR PARTES NO AUTORIZADAS. USTED RECONOCE Y ACEPTA
              QUE EL USO DEL EL SERVICIO ES BAJO SU PROPIO RIESGO. RECONOCIENDO
              TAL, USTED ENTIENDE Y ACEPTA QUE, EN LA MEDIDA MÁXIMA PERMITIDA
              POR LA LEY APLICABLE, NI OS CITY NI LOS PROVEEDORES O
              LICENCIADORES SERÁN RESPONSABLES ANTE USTED POR CUALQUIER
              INCIDENTE DIRECTO O INDIRECTO, PUNITIVO U OTROS DAÑOS DE CUALQUIER
              TIPO, INCLUYENDO, SIN LIMITACIÓN, DAÑOS POR PÉRDIDA DE BENEFICIOS,
              BUENA VOLUNTAD, USO, DATOS U OTROS TANGIBLES O PERDIDAS
              INTANGIBLES O CUALQUIER OTRO DAÑO COMO RESULTADO DEL SERVICIO; EL
              USO O LA INCAPACIDAD DE UTILIZAR LA APLICACIÓN O EL SERVICIO;
              ACCESO NO AUTORIZADO O ALTERACIÓN DE SU TRANSMISIONES O DATOS;
              DECLARACIONES O CONDUCTA DE CUALQUIER TERCERO SOBRE EL SITIO O
              SERVICIO; CUALQUIER ACCIÓN QUE TOMAMOS O NO TOMAMOS COMO RESULTADO
              DE LAS COMUNICACIONES QUE USTED NOS ENVIO; ERRORES HUMANOS; MAL
              FUNCIONAMIENTO TECNICO; FALLAS, INCLUYENDO SERVICIOS PÚBLICOS;
              OMISIONES, INTERRUPCIONES, LATENCIAS, SUPRESIONES O DEFECTOS DE
              CUALQUIER DISPOSITIVO O RED, PROVEEDORES O SOFTWARE (INCLUYENDO,
              PERO SIN LIMITARSE A, AQUELLOS QUE NO PERMITEN LA PARTICIPACION EN
              EL SERVICIO); CUALQUIER LESIÓN O DAÑO AL EQUIPO DE SU COMPUTADORA;
              INCAPACIDAD PARA ACCEDER TOTALMENTE AL SITIO O SERVICIO O
              CUALQUIER OTRO SITIO WEB; ROBO, MANIPULACION, DESTRUCCIÓN O ACCESO
              NO AUTORIZADO A IMÁGENES U OTROS CONTENIDO DE CUALQUIER TIPO;
              DATOS QUE SE TRATAN TARDE O INCORRECTAMENTE O ES INCOMPLETO O
              PERDIDO; ERRORES TIPOGRÁFICOS, DE IMPRESIÓN O DE OTRO TIPO, O
              CUALQUIER COMBINACIÓN DE LOS MISMOS; O CUALQUIER OTRO ASUNTO
              RELACIONADO CON EL SITIO O SERVICIO. ALGUNAS JURISDICCIONES NO
              PERMITEN LA EXCLUSIÓN DE CIERTAS GARANTÍAS O LA LIMITACIÓN O
              EXCLUSIÓN DE RESPONSABILIDAD POR DANOS INCIDENTALES O
              CONSECUENTES. POR CONSIGUIENTE, ALGUNAS DE LAS POSIBLES
              LIMITACIONES ANTERIORES NO SE APLICAN EN SU CASO.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              10. Licencias y Accesos
            </Text>
            <Text style={styles.text}>
              Sujeto a su cumplimiento de estos Términos y su pago de cualquier
              tarifa aplicable, OS City le otorga un personal, no exclusivo,
              intransferible, no sublicenciable, licencia para acceder y
              utilizar los Servicios y el Contenido únicamente para su para uso
              personal o, si está utilizando los Servicios en nombre de un
              entidad el uso interno de dicha entidad. Esta licencia no incluye
              cualquier reventa o uso comercial del Servicio o cualquier uso
              derivado del Servicio. Todos los derechos no otorgados
              expresamente a usted en estos Los términos están reservados y
              retenidos por OS City o sus licenciantes. El Servicio Soberana no
              se puede reproducir, duplicar, copiar, vender, revender, o
              explotar de otro modo para cualquier propósito sin el
              consentimiento expreso por escrito de OS City. No puede hacer un
              mal uso de los Servicios. Puede utilizar los Servicios solo como
              permitido por la ley. Las licencias otorgadas por OS City terminan
              si no cumple con estos Términos.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              11. Enlaces o aplicaciones de terceros
            </Text>
            <Text style={styles.text}>
              El Servicio proporciona, o terceros pueden proporcionar, enlaces a
              otros World Wide Web o sitios, aplicaciones o recursos accesibles.
              Dado que OS City do no tiene control sobre dichos sitios, las
              aplicaciones y recursos, usted reconoce y acepta que OS City no es
              responsable de la disponibilidad de dichos sitios externos,
              aplicaciones o recursos, y no respalda ni es responsable de
              cualquier contenido, publicidad, productos o otros materiales en
              dichos sitios o recursos o disponibles en ellos. Usted además
              reconoce y acepta que OS City no es responsable, directa o
              indirectamente, de cualquier daño o pérdida causada o
              supuestamente causada por o en conexión con el uso o dependencia
              de dicho contenido, bienes o servicios disponibles a través de
              dicho sitio o recurso.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              12. Terminación y Suspensión
            </Text>
            <Text style={styles.text}>
              OS City puede, a su sola discreción, rescindir o suspender o parte
              del Servicio y su acceso a Soberana inmediatamente, sin previo
              aviso ni responsabilidad, si incumple cualquiera de los términos o
              condiciones de los Términos. Al finalizar su acceso, su derecho a
              utilizar el Servicio cesará inmediatamente. La siguiente las
              disposiciones de los Términos sobreviven a la terminación de estos
              Términos: INDEMNIDAD; EXENCIONES DE GARANTIA; LIMITACION DE
              RESPONSABILIDAD; NUESTRO DERECHOS DE PROPIEDAD; ENLACES;
              TERMINACION; NO HAY TERCEROS BENEFICIARIOS; ARBITRAJE VINCULANTE Y
              RENUNCIA A DEMANDAS COLECTIVAS; INFORMACIÓN GENERAL.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              13. Sin terceros beneficiarios
            </Text>
            <Text style={styles.text}>
              Usted acepta que, salvo que se indique expresamente lo contrario
              en estas condiciones, (a) no habrá terceros beneficiarios de los
              Términos y (b) nada en estos Términos se interpretará o implica
              cualquier relación de agencia, franquicia, sociedad o empresa
              conjunta entre usted y OS City.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              14. Información general
            </Text>
            <Text style={styles.text}>14.1. Acuerdo completo</Text>
            <Text style={styles.text}>
              Estos Términos (y cualquier término adicional, reglas y
              condiciones de participación que OS City puede publicar en el
              Servicio) constituyen el acuerdo completo entre usted y OS City
              con respecto al Servicio y reemplaza cualquier acuerdo previo,
              oral o por escrito, entre usted y OS City. En el caso de un
              conflicto entre estos Términos, reqlas y condiciones de
              participación, esta última prevalecerá sobre las Condiciones en la
              medida del conflicto.
            </Text>
            <Text style={styles.text}>
              14.2. Renuncia y divisibilidad de los términos
            </Text>
            <Text style={styles.text}>
              El hecho de que OS City no ejerza o haga cumplir cualquier derecho
              o la disposición de los Términos no constituirá una renuncia a tal
              derecho o provisión. Si alguna disposición de los Términos es
              encontrada por un árbitro o tribunal de jurisdicción competente
              sea inválido, No obstante, las partes acuerdan que el árbitro o el
              tribunales forzarse por dar efecto a las intenciones de las partes
              tal como se refleja en la disposición y las demás disposiciones de
              los Términos permanecen en plena fuerza y efecto.
            </Text>
            <Text style={styles.text}>14.3. Estatuto de limitaciones</Text>
            <Text style={styles.text}>
              Usted acepta que, independientemente de cualquier estatuto o ley
              en contrario, cualquier reclamo o causa de acción que surja o esté
              relacionada con el uso del Servicio o los Términos deben
              presentarse dentro de un (1) año después de que surja dicha
              reclamación o causa de acción o sea excluida para siempre.
            </Text>
            <Text style={styles.text}>14.4. Comunicaciones</Text>
            <Text style={styles.text}>
              Usuarios con preguntas, quejas o reclamaciones con respecto al
              Servicio puede contactarnos en info@os.city
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
    padding: 30,
    margin: 15,
    borderRadius: 15,
    height: ScreenHeight - 150,
    marginBottom: 20,
  },
  iconBack: {
    marginTop: 3,
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

export default TermsAndConditions;
