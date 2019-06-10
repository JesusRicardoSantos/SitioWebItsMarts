using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using SitioWeb.Models;

namespace SitioWeb.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            try
            {
                Service.ServiceSoapClient servicesSoap = new Service.ServiceSoapClient();
                var dataCloud = servicesSoap.VisualizarCuenta(0, 1);
                var dataPage = JsonConvert.DeserializeObject<List<Usuarios>>(dataCloud);

                return View(dataPage);
            }
            catch (Exception)
            {
                List<Usuarios> lstnula = new List<Usuarios>();
                lstnula.Add(new Usuarios
                {
                    Nombre = "Sin conexion"
                });
                return View();
            }
        }

        //Metodos enlazados con ajax
        public string consultaDatoUsuario(int intId)
        {
            try
            {
                Service.ServiceSoapClient servicesSoap = new Service.ServiceSoapClient();
                string strDatosUsuario = "";
                var datos = JsonConvert.DeserializeObject<List<Usuario>>(servicesSoap.VisualizarCuenta(intId, 2));

                strDatosUsuario = datos[0].Nombre + "," +
                datos[0].A_paterno + "," +
                datos[0].A_materno + "," +
                datos[0].Telefono + "," +
                datos[0].Cliente_sap.ToString() + "," +
                datos[0].Fecha_creacion.Year.ToString() + "-" + datos[0].Fecha_creacion.Month.ToString() + "-" + datos[0].Fecha_creacion.Day.ToString() + "," +
                datos[0].Nombre_fiscal + "," +
                datos[0].Rfc + "," +
                datos[0].Contacto + "," +
                datos[0].Longitud.ToString() + "," +
                datos[0].Latitud.ToString() + "," +
                datos[0].Contrasena + "," +
                datos[0].Referencia + "," +
                datos[0].Cedild;

                return strDatosUsuario;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public int agregarUsuario(Usuario usuarioData)
        {
            try
            {
                Service.ServiceSoapClient servicesSoap = new Service.ServiceSoapClient();
                var jsonBody = JsonConvert.SerializeObject(usuarioData);
                int intResult = servicesSoap.CrearCuenta(jsonBody);
                return intResult;
            }
            catch (Exception)
            {
                return 400;//Excepcion no controlada
            }
        }

        public int editarUsuario(Usuario usuarioData)
        {
            try
            {
                Service.ServiceSoapClient servicesSoap = new Service.ServiceSoapClient();
                var jsonBody = JsonConvert.SerializeObject(usuarioData);
                int intResult = servicesSoap.ActualizarCuenta(jsonBody);
                return intResult;
            }
            catch (Exception)
            {
                return 400;//Excepcion no controlada
            }
        }

        public int eliminarUsuario(int intId)
        {
            try
            {
                Service.ServiceSoapClient servicesSoap = new Service.ServiceSoapClient();
                return servicesSoap.EliminarCuenta(intId);
            }
            catch (Exception)
            {
                return 400;
            }
        }
    }
}