$(document).ready(function() {
    $(".delete-P").on("click", function(e) {
        e.preventDefault(); // Evitar el envío por defecto del formulario
        if (confirm("¿Deseas eliminar?")) {
            alert("Eliminado");
            // Enviar el formulario más cercano al botón de eliminación
            $(this).closest("form").submit(); // Corregido: enviar el formulario
        } else {
            alert("No se eliminó");
        }
    });
});
