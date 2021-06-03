using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Notas.Models
{
	/// <summary>
	/// Campos de una Nota
	/// </summary>
	public class Nota
	{
		/// <summary>
		/// / Id de la Nota
		/// </summary>
		public Int32 id { get; set; }
		/// <summary>
		/// / Titulo de la nota
		/// </summary>
		public String title { get; set; }
		/// <summary>
		/// Nota
		/// </summary>
		public String nota { get; set; }
		/// <summary>
		/// Fecha de creación de la Nota
		/// </summary>
		public DateTime creationDate { get; set; }
	}
}
