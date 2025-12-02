let deleteCallback = null;  // Funktion, die beim Bestätigen ausgeführt wird

// Modal HTML laden (einmal pro Seite)
fetch('delete_modal.html')
  .then(res => res.text())
  .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);

      const modalEl = document.getElementById('deleteModal');
      const modal = new bootstrap.Modal(modalEl);

      document.getElementById('confirmDeleteBtn').addEventListener('click', async () => {
          if (typeof deleteCallback === 'function') {
              await deleteCallback();
          }
          modal.hide();
          deleteCallback = null;
      });
  });

/**
 * Funktion, um das Modal aufzurufen
 * @param {string} message - Nachricht im Modal
 * @param {function} callback - Funktion, die bei Bestätigung ausgeführt wird
 */
export function openDeleteModal(message, callback) {
    const modalEl = document.getElementById('deleteModal');
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

    document.getElementById('deleteModalMessage').textContent = message;
    deleteCallback = callback;

    modal.show();
}