using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Notas.Models;

namespace Notas.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   public class NotaController : ControllerBase
   {
      //Temporal
      static List<Nota> ListNotas = new List<Nota>()
       {
            new Nota()
            {
                     id = 1,
                     title = "Nota 1",
                     nota = "esto es una nota",
                     creationDate = new DateTime(2020,12,23)
            }
      };

      [Route("insert")]
      [HttpPost]
      public IActionResult Insert([FromBody] Nota nota)
      {
         ListNotas.Add(nota);
         return Ok(nota);
      }

      [Route("modify")]
      [HttpPost]
      public IActionResult Modify([FromBody] Nota nota)
      {
         Nota temp = ListNotas.Find(n => n.id == nota.id);
         if (temp != null)
         {
            temp.title = nota.title;
            temp.nota = nota.nota;
            temp.creationDate = nota.creationDate;
         }
         else
         {
            return BadRequest("No se lograron actualizar ningún registro");
         }
         return Ok(nota);
      }

      [Route("queryAll")]
      [HttpPost]
      public IActionResult QueryAll()
      {
         return Ok(ListNotas);
      }

      [Route("delete")]
      [HttpPost]

      public IActionResult Delete(Nota nota)
      {
         Nota notaDelete = ListNotas.Find(n => n.id == nota.id);
         if (notaDelete == null)
         {
            return NotFound();
         }
			else
			{
            ListNotas.Remove(notaDelete);
         }
         return Ok();
      }
   }
   public class IdNota
   {
      public int Id { get; set; }
   }
}
