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
              proporciona una plataforma para la gesti??n de la identidad digital
              a trav??s de una interfaz de programaci??n de aplicaciones (API)
              para gobierno y una aplicaci??n m??vil para el ciudadano. La
              aplicaci??n m??vil Soberana incluye texto, im??genes, audio, c??digo y
              otros materiales o aplicaciones de terceros accesible a trav??s de
              la aplicaci??n Soberana (colectivamente, con el Sitio, el
              "Contenido"). La API, la aplicaci??n m??vil y cualquier otra
              caracter??stica, herramienta, material u otros servicios ofrecidos
              por OS City se denominan aqu?? como el "Servicio"
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              1. Aceptaci??n de los t??rminos
            </Text>
            <Text style={styles.text}>
              Lea atentamente estos T??rminos de uso (los "T??rminos") antes de
              utilizar el servicio. Al usar o acceder a los Servicios, o al
              hacer clic para aceptar estos T??rminos, usted acepta: (a) estos
              T??rminos (b) consentimiento para la recopilaci??n, uso, divulgaci??n
              y otros manejo de la informaci??n como se describe en nuestra
              Pol??tica de Privacidad y (c) aceptar los t??rminos, reglas y
              condiciones adicionales de participaci??n emitida por Soberana. Si
              no est?? de acuerdo con ninguna de las disposiciones de estos
              T??rminos, nuestra Privacidad Pol??tica o los T??rminos del proveedor
              de servicios, debe detener de inmediato utilizando los Servicios.
              Le animamos a leer estos documentos cuidadosamente y util??celos
              para tomar decisiones informadas.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              2. Modificaci??n de T??rminos
            </Text>
            <Text style={styles.text}>
              OS City se reserva el derecho de cambiar o modificar estos
              T??rminos en en cualquier momento y a nuestro exclusivo criterio.
              La versi??n m??s actual de estos T??rminos se publicar??n en nuestro
              Sitio. Usted ser?? responsable de revisar y familiarizarse con
              dichas modificaciones. Uso de los Servicios por su parte despu??s
              de cualquier modificaci??n de los T??rminos, constituye su
              aceptaci??n de los T??rminos modificados.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              3. Elegibilidad
            </Text>
            <Text style={styles.text}>
              Por la presente declara y garantiza que es plenamente capaz y
              competente para entrar en los t??rminos, condiciones, obligaciones,
              afirmaciones, representaciones y garant??as establecidas en estos
              T??rminos y cumplir con estos T??rminos. Accediendo al Contenido o
              Servicios, usted declara y garantiza que es del mayor??a de edad
              legal en su jurisdicci??n o de la edad requerida para acceder a
              dichos Servicios y Contenido. Adem??s, declara que tiene permitido
              legalmente usar el servicio en su jurisdicci??n, incluida la
              posesi??n de tokens criptogr??ficos de valor, y interactuar con los
              Servicios o el Contenido de cualquier manera. Usted declara que es
              responsable de garantizar el cumplimiento de las leyes de su
              jurisdicci??n y reconoce que Soberana no es responsable por su
              cumplimiento de dichas leyes.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              4. Preferencias de registro, cuenta y comunicaci??n
            </Text>
            <Text style={styles.text}>Registro.</Text>
            <Text style={styles.text}>
              Para acceder y utilizar determinadas ??reas o funciones del
              Servicios, deber?? registrarse para obtener una cuenta de Soberana.
              Al crear una cuenta, usted acepta (a) proporcionar informaci??n
              precisa, actualizada e informaci??n completa de la cuenta sobre
              usted, (b)mantener y actualizar puntualmente, seg??n sea necesario,
              su informaci??n de la cuenta, (c) mantener la seguridad de su
              cuenta, credenciales, claves, reconocimiento biom??trico o
              cualquier otro c??digo que utilizar para acceder a su cuenta y a
              los Servicios, (d) aceptar todos los riesgos de acceso no
              autorizado a su cuenta y a la informaci??n que proporcionarnos, y
              (e) notificarnos inmediatamente si descubre o sospechar de
              cualquier otra forma cualquier violaci??n de seguridad relacionada
              con los Servicios o tu cuenta. Usted es responsable de todo el uso
              de los Servicios que ocurren bajo su cuenta.
            </Text>
            <Text style={styles.text}>Cuenta.</Text>
            <Text style={styles.text}>
              No seremos responsables de seguir ninguna instrucci??n que
              recibamos a trav??s de su cuenta, incluso si no fue autorizado por
              usted, o si se ingres?? por error o es inexacto. Para verificar el
              autenticidad de cualquier instrucci??n que recibamos a trav??s de su
              cuenta, puede requerir su firma o identificaci??n en cualquier
              forma que consideremos necesario; a nuestro exclusivo criterio,
              podemos aceptar im??genes digitales y firmas electr??nicas para
              documentos que necesitan ser firmados. Usted acepta (i)
              indemnizar, defender y eximirnos de toda responsabilidad por todas
              las reclamaciones, costos, p??rdidas y da??os, incluidos los
              honorarios razonables de abogados, que resultan de nuestro
              seguimiento de sus instrucciones para tomar cualquier acci??n
              relacionada con su cuenta, y (i) podemos cargar su cuenta por
              todos y cada uno de dichos reclamos, costos, p??rdidas y da??os
              incurridos por nosotros.
            </Text>
            <Text style={styles.text}>Comunicaci??n.</Text>
            <Text style={styles.text}>
              Al crear una cuenta en Soberana, tambi??n acepta recibir
              comunicaciones electr??nicas de OS City (por ejemplo, por correo
              electr??nico o por publicar avisos en los Servicios). Estas
              comunicaciones pueden incluir avisos sobre su cuenta y son parte
              de su relaci??n con nosotros. Usted acepta que cualquier aviso,
              acuerdo, divulgaci??n u otro comunicaciones que le enviemos
              electr??nicamente satisfar??n cualquier requisitos legales de
              comunicaci??n, incluyendo que Dichas comunicaciones se har??n por
              escrito. Debe mantener copias de comunicaciones electr??nicas de
              nuestra parte imprimiendo una copia en papel o guardar una copia
              electr??nica. Tambi??n podemos enviarle promociones comunicaciones
              por correo electr??nico, incluidos boletines informativos, ofertas
              especiales, encuestas y otras noticias e informaci??n que creemos
              ser??n de inter??s para ti. En cualquier momento puede optar por no
              participar recibir estos correos electr??nicos promocionales
              siguiendo las instrucciones para cancelar la suscripci??n
              instrucciones proporcionadas en el mismo.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              5. Contrase??a de cuenta, seguridad e identificadores
              descentralizados (DID)
            </Text>
            <Text style={styles.text}>Registro.</Text>
            <Text style={styles.text}>
              Al configurar una cuenta dentro de Soberana, ser?? responsable de
              mantener la frase secreta de su propia cuenta en privado. Estas
              frases semilla pueden incluir su clave privada de recuperaci??n, un
              frase de doce palabras (mnem??nico) u otras caracter??sticas de
              seguridad. Usted reconoce su entendimiento de que cualquier
              persona con conocimiento de su frase semilla puede generar sus
              claves privadas. Usted reconoce que Soberana no es propietario de
              sus claves privadas o de la frase semilla. Soberana no tiene la
              capacidad de recuperar sus claves privadas o tu frase semilla en
              caso de que se pierdan.
            </Text>
            <Text style={styles.text}>Seguridad.</Text>
            <Text style={styles.text}>
              Su clave privada, correspondiente a su direcci??n de identidad
              p??blica es almacenada en el llavero controlado por el "enclave
              sequro" de su dispositivo. Deber?? actualizar peri??dicamente el
              sistema operativo de su dispositivo con cualquier software o
              actualizaciones de seguridad. A pesar de lo anterior, reconoce que
              la aplicaci??n Soberana, que existe fuera del "enclave seguro",
              cuando lo inicia el Usuario, utiliza la informaci??n de la clave
              privada almacenada en el llavero para actividades de firma. Su
              clave privada permanece dentro de Soberana y OS City no env??a la
              clave privada a los servidores. Usted est?? de acuerdo para (a)
              mantener la confidencialidad de su informaci??n secreta y no
              compartir con cualquier otra persona; (b) no comparta su frase
              semilla con nadie y almacenarlo de manera segura; y (c) notificar
              inmediatamente OS City de cualquier uso no autorizado de su cuenta
              o incumplimiento de seguridad. OS City no ser?? responsable de
              ninguna p??rdida o da??os derivados de su incumplimiento de esta
              secci??n.
            </Text>
            <Text style={styles.text}>DID.</Text>
            <Text style={styles.text}>
              Al usar la aplicaci??n Soberana, usted reconoce, acepta y da su
              consentimiento para la creaci??n de un identificador
              descentralizado (DID) para usted. Un DID es esencialmente una
              direcci??n p??blica, una cadena que sirve como "Identificador". Tu
              DID, tal como est?? dise??ado en Soberana, no est?? vinculada a su
              nombre natural o informaci??n personal, y OS City no recopila datos
              que permitan vincular ambos entre s??.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              6. Declaraciones, garant??as y riesgos
            </Text>
            <Text style={styles.text}>6.1. Renuncia a la garant??a.</Text>
            <Text style={styles.text}>
              Usted comprende y acepta expresamente que su uso del Servicio es
              bajo su propio riesgo. El Servicio (incluido el Servicio y el
              Contenido) se proporciona TAL CUAL Y como est?? disponible, sin
              garant??as de ning??n tipo, ya sean expresas o impl??citas,
              incluyendo, sin limitaci??n, garant??as impl??citas de
              comerciabilidad, idoneidad para un prop??sito particular o no
              infracci??n. Reconoce que OS City no tiene control y no hay
              obligaci??n de tomar ninguna medida con respecto a: qu?? usuarios
              deciden acceder o utilizar el Servicio; qu?? efecto el contenido
              puede tener en usted; c??mo puede interpretar o utilizar el
              Contenido; o que acciones tu puede tomar como resultado de haber
              estado expuesto al Contenido. Usted libera a OS City de toda
              responsabilidad por haber adquirido contenido a trav??s del
              Servicio. OS City no hace representaciones relativas a cualquier
              contenido incluido en o al que se accede a trav??s del Servicio, y
              no ser?? responsable de la precisi??n, el cumplimiento de los
              derechos de autor, la legalidad o la decencia del material
              contenido en el Servicio o al que se accede a trav??s de ??l.
            </Text>
            <Text style={styles.text}>
              6.2. Sofisticaci??n y riesgo de los sistemas criptogr??ficos.
            </Text>
            <Text style={styles.text}>
              Al utilizar el Servicio o interactuar con el Contenido en
              cualquier manera, usted declara y garantiza que comprende (a) la
              riesgos inherentes asociados con los sistemas criptogr??ficos, y
              (b) la uso y complejidades de la criptograf??a de clave p??blica /
              privada, tokens nativos criptogr??ficos, como Ether (ETH) y Bitcoin
              (BTC), tokens basados en contratos inteligentes como los que
              siguen al Ethereum Token Est??ndar
              (https://github.com/ethereum/EIPs/issues/20) y sistemas de
              software basados en blockchain.
            </Text>
            <Text style={styles.text}>
              6.3. Riesgo de acciones regulatorias en una o m??s jurisdicciones
            </Text>
            <Text style={styles.text}>
              Usted reconoce que, como tecnolog??a emergente, LACChain, LACnet,
              Ethereum u otras cadenas de bloques que implementan la m??quina
              virtual Ethereum (EVM) podr??a verse afectado por una o m??s
              consultas regulatorias o acciones reglamentarias, que podr??an
              impedir o limitar la capacidad de OS City para continuar
              desarroll??ndose, o que podr??a impedir o limitar su capacidad para
              acceder o utilizar el Servicio o basado en EVM cadenas de bloques.
            </Text>
            <Text style={styles.text}>
              6.4. Riesgo de errores, errores y tiempo de inactividad
            </Text>
            <Text style={styles.text}>
              Usted reconoce y acepta que los Servicios (a) pueden contener
              errores y defectos, (b) puede funcionar incorrectamente o estar
              sujeto a per??odos de tiempo de inactividad e indisponibilidad, (c)
              puede resultar en total o p??rdida parcial o corrupci??n de los
              datos de la transacci??n, y (d) puede ser modificado en cualquier
              momento, incluso mediante la publicaci??n de versiones, en cada
              caso con o sin previo aviso.
            </Text>
            <Text style={styles.text}>6.5 P??rdida total de datos</Text>
            <Text style={styles.text}>
              Usted reconoce que OS City no fabric?? su dispositivo. La seguridad
              del enclave de seguridad de su dispositivo depende en el
              fabricante del dispositivo. Si tiene sospechas para creer que la
              seguridad del enclave de seguridad de su dispositivo ha sido
              comprometido, acepta detener el uso de Soberana y buscar
              asistencia directamente con el fabricante del dispositivo. Usted
              reconocer el riesgo de que si la seguridad o integridad de su el
              enclave de seguridad del dispositivo est?? comprometido, la
              seguridad de su la llave privada puede estar en riesgo. OS City no
              es propietaria ni opera los servidores de terceros utilizados para
              almacenar datos de identificaci??n. La seguridad de los datos
              depende del propietario y operador del servidores de terceros.
              Reconoce que en caso de que la seguridad o la integridad de los
              servidores de terceros est??n comprometidas, sus datos de
              identificaci??n pueden da??arse total o parcialmente y / o perderse.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              7. Certificaciones en blockchain y el servicio de credenciales de
              Soberana
            </Text>
            <Text style={styles.text}>
              Los Servicios pueden, de vez en cuando, permitir varios
              atestaciones que se realizar??n sobre un usuario. A menos que se
              especifique lo contrario, estas certificaciones son realizadas de
              forma independiente por terceros (gobiernos, universidades u
              organizaciones en general). OS City no representa ni garantiza la
              veracidad o exactitud de estas atestaciones de terceros. Las
              atestaciones de terceros pueden estar sujetas a las partes que
              certifican. En algunos casos, certificaciones de terceros se puede
              realizar a trav??s del Servicio de Credenciales de OS City
              ("Credenciales Verificables"). La plataforma de OS City permite
              que un tercero realice una atestaci??n sobre un usuario en
              particular sin ese tercero haciendo directamente la atestaci??n. OS
              City no hace ninguna representaci??n como la veracidad o exactitud
              de las atestaciones realizadas a trav??s de Soberana o la
              plataforma de OS City, y por la presente renuncia expl??citamente a
              cualquier y toda responsabilidad relacionada con el uso de las
              credenciales para cualquier prop??sito. OS City le permite optar
              afirmativamente y elegir enviar y almacenar una copia encriptada
              de todos sus reclamos, atestaciones y las asociaciones
              correspondientes de esa informaci??n ("Datos de identificaci??n")
              para su cuenta que est?? almacenada en un servicio que es mantenido
              por OS City y se ejecuta en servidores e infraestructura de
              propiedad y operado por proveedores externos. Esto significa que
              tendr??s la capacidad de recuperar datos de identificaci??n, pero
              solo despu??s de restaurar las claves a sus datos de identificaci??n
              de su semilla. OS City no hace una copia de seguridad de las
              claves privadas, solo datos de identificaci??n. Al optar por usar
              los Servicios, no solo tiene la capacidad de hacer una copia de
              seguridad de sus datos de identificaci??n, sino tambi??n puede
              eliminar todos los datos en los servidores de terceros
              administrados de c??digo abierto de Soberana de dentro de la
              aplicaci??n m??vil. Usted reconoce que OS City no es responsable de
              la seguridad o integridad del servidores gestionados por terceros.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              8. Indemnidad
            </Text>
            <Text style={styles.text}>
              Usted acepta liberar y mantener indemne a OS City y sus matrices,
              subsidiarias, afiliadas y agencias, as?? como los funcionarios,
              directores, empleados, accionistas y representantes de cualquiera
              de las entidades anteriores, de y contra todas y cada una de las
              p??rdidas, pasivos, gastos, reclamaciones por da??os, costos
              (incluidos los honorarios de abogados y costas judiciales) o
              acciones de cualquier tipo que surjan o resulten de su uso del
              Servicio, su violaci??n de estos T??rminos de Uso y cualquiera de
              sus actos u omisiones que impliquen derechos de publicidad,
              difamaci??n o invasi??n de la privacidad. OS City se reserva el
              derecho, a sus propias expensas, de asumir la defensa y el control
              exclusivos de cualquier asunto sujeto a indemnizaci??n por su parte
              y, en en tal caso, acepta cooperar con OS City en la defensa de
              tal materia.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              9. Limitaci??n de responsabilidad
            </Text>
            <Text style={styles.text}>
              USTED RECONOCE Y ACEPTA QUE ASUME LA RESPONSABILIDAD TOTAL DE SU
              USO DE LA APLICACI??N Y SERVICIO. USTED RECONOCE Y ACEPTA QUE
              CUALQUIER INFORMACION QUE ENVIE O RECIBA DURANTE EL USO DE LA
              APLICACI??N Y EL SERVICIO PUEDE NO SER SEGURO Y PUEDE SER
              INTERCEPTADO POR PARTES NO AUTORIZADAS. USTED RECONOCE Y ACEPTA
              QUE EL USO DEL EL SERVICIO ES BAJO SU PROPIO RIESGO. RECONOCIENDO
              TAL, USTED ENTIENDE Y ACEPTA QUE, EN LA MEDIDA M??XIMA PERMITIDA
              POR LA LEY APLICABLE, NI OS CITY NI LOS PROVEEDORES O
              LICENCIADORES SER??N RESPONSABLES ANTE USTED POR CUALQUIER
              INCIDENTE DIRECTO O INDIRECTO, PUNITIVO U OTROS DA??OS DE CUALQUIER
              TIPO, INCLUYENDO, SIN LIMITACI??N, DA??OS POR P??RDIDA DE BENEFICIOS,
              BUENA VOLUNTAD, USO, DATOS U OTROS TANGIBLES O PERDIDAS
              INTANGIBLES O CUALQUIER OTRO DA??O COMO RESULTADO DEL SERVICIO; EL
              USO O LA INCAPACIDAD DE UTILIZAR LA APLICACI??N O EL SERVICIO;
              ACCESO NO AUTORIZADO O ALTERACI??N DE SU TRANSMISIONES O DATOS;
              DECLARACIONES O CONDUCTA DE CUALQUIER TERCERO SOBRE EL SITIO O
              SERVICIO; CUALQUIER ACCI??N QUE TOMAMOS O NO TOMAMOS COMO RESULTADO
              DE LAS COMUNICACIONES QUE USTED NOS ENVIO; ERRORES HUMANOS; MAL
              FUNCIONAMIENTO TECNICO; FALLAS, INCLUYENDO SERVICIOS P??BLICOS;
              OMISIONES, INTERRUPCIONES, LATENCIAS, SUPRESIONES O DEFECTOS DE
              CUALQUIER DISPOSITIVO O RED, PROVEEDORES O SOFTWARE (INCLUYENDO,
              PERO SIN LIMITARSE A, AQUELLOS QUE NO PERMITEN LA PARTICIPACION EN
              EL SERVICIO); CUALQUIER LESI??N O DA??O AL EQUIPO DE SU COMPUTADORA;
              INCAPACIDAD PARA ACCEDER TOTALMENTE AL SITIO O SERVICIO O
              CUALQUIER OTRO SITIO WEB; ROBO, MANIPULACION, DESTRUCCI??N O ACCESO
              NO AUTORIZADO A IM??GENES U OTROS CONTENIDO DE CUALQUIER TIPO;
              DATOS QUE SE TRATAN TARDE O INCORRECTAMENTE O ES INCOMPLETO O
              PERDIDO; ERRORES TIPOGR??FICOS, DE IMPRESI??N O DE OTRO TIPO, O
              CUALQUIER COMBINACI??N DE LOS MISMOS; O CUALQUIER OTRO ASUNTO
              RELACIONADO CON EL SITIO O SERVICIO. ALGUNAS JURISDICCIONES NO
              PERMITEN LA EXCLUSI??N DE CIERTAS GARANT??AS O LA LIMITACI??N O
              EXCLUSI??N DE RESPONSABILIDAD POR DANOS INCIDENTALES O
              CONSECUENTES. POR CONSIGUIENTE, ALGUNAS DE LAS POSIBLES
              LIMITACIONES ANTERIORES NO SE APLICAN EN SU CASO.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              10. Licencias y Accesos
            </Text>
            <Text style={styles.text}>
              Sujeto a su cumplimiento de estos T??rminos y su pago de cualquier
              tarifa aplicable, OS City le otorga un personal, no exclusivo,
              intransferible, no sublicenciable, licencia para acceder y
              utilizar los Servicios y el Contenido ??nicamente para su para uso
              personal o, si est?? utilizando los Servicios en nombre de un
              entidad el uso interno de dicha entidad. Esta licencia no incluye
              cualquier reventa o uso comercial del Servicio o cualquier uso
              derivado del Servicio. Todos los derechos no otorgados
              expresamente a usted en estos Los t??rminos est??n reservados y
              retenidos por OS City o sus licenciantes. El Servicio Soberana no
              se puede reproducir, duplicar, copiar, vender, revender, o
              explotar de otro modo para cualquier prop??sito sin el
              consentimiento expreso por escrito de OS City. No puede hacer un
              mal uso de los Servicios. Puede utilizar los Servicios solo como
              permitido por la ley. Las licencias otorgadas por OS City terminan
              si no cumple con estos T??rminos.
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
              dichos sitios o recursos o disponibles en ellos. Usted adem??s
              reconoce y acepta que OS City no es responsable, directa o
              indirectamente, de cualquier da??o o p??rdida causada o
              supuestamente causada por o en conexi??n con el uso o dependencia
              de dicho contenido, bienes o servicios disponibles a trav??s de
              dicho sitio o recurso.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              12. Terminaci??n y Suspensi??n
            </Text>
            <Text style={styles.text}>
              OS City puede, a su sola discreci??n, rescindir o suspender o parte
              del Servicio y su acceso a Soberana inmediatamente, sin previo
              aviso ni responsabilidad, si incumple cualquiera de los t??rminos o
              condiciones de los T??rminos. Al finalizar su acceso, su derecho a
              utilizar el Servicio cesar?? inmediatamente. La siguiente las
              disposiciones de los T??rminos sobreviven a la terminaci??n de estos
              T??rminos: INDEMNIDAD; EXENCIONES DE GARANTIA; LIMITACION DE
              RESPONSABILIDAD; NUESTRO DERECHOS DE PROPIEDAD; ENLACES;
              TERMINACION; NO HAY TERCEROS BENEFICIARIOS; ARBITRAJE VINCULANTE Y
              RENUNCIA A DEMANDAS COLECTIVAS; INFORMACI??N GENERAL.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              13. Sin terceros beneficiarios
            </Text>
            <Text style={styles.text}>
              Usted acepta que, salvo que se indique expresamente lo contrario
              en estas condiciones, (a) no habr?? terceros beneficiarios de los
              T??rminos y (b) nada en estos T??rminos se interpretar?? o implica
              cualquier relaci??n de agencia, franquicia, sociedad o empresa
              conjunta entre usted y OS City.
            </Text>
            <Text style={[styles.subtitle, globalStyles.fontBold]}>
              14. Informaci??n general
            </Text>
            <Text style={styles.text}>14.1. Acuerdo completo</Text>
            <Text style={styles.text}>
              Estos T??rminos (y cualquier t??rmino adicional, reglas y
              condiciones de participaci??n que OS City puede publicar en el
              Servicio) constituyen el acuerdo completo entre usted y OS City
              con respecto al Servicio y reemplaza cualquier acuerdo previo,
              oral o por escrito, entre usted y OS City. En el caso de un
              conflicto entre estos T??rminos, reqlas y condiciones de
              participaci??n, esta ??ltima prevalecer?? sobre las Condiciones en la
              medida del conflicto.
            </Text>
            <Text style={styles.text}>
              14.2. Renuncia y divisibilidad de los t??rminos
            </Text>
            <Text style={styles.text}>
              El hecho de que OS City no ejerza o haga cumplir cualquier derecho
              o la disposici??n de los T??rminos no constituir?? una renuncia a tal
              derecho o provisi??n. Si alguna disposici??n de los T??rminos es
              encontrada por un ??rbitro o tribunal de jurisdicci??n competente
              sea inv??lido, No obstante, las partes acuerdan que el ??rbitro o el
              tribunales forzarse por dar efecto a las intenciones de las partes
              tal como se refleja en la disposici??n y las dem??s disposiciones de
              los T??rminos permanecen en plena fuerza y efecto.
            </Text>
            <Text style={styles.text}>14.3. Estatuto de limitaciones</Text>
            <Text style={styles.text}>
              Usted acepta que, independientemente de cualquier estatuto o ley
              en contrario, cualquier reclamo o causa de acci??n que surja o est??
              relacionada con el uso del Servicio o los T??rminos deben
              presentarse dentro de un (1) a??o despu??s de que surja dicha
              reclamaci??n o causa de acci??n o sea excluida para siempre.
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
