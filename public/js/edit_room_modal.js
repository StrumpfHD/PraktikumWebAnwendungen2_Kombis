let editCallback = null;

/**
 * Modal einmal pro Seite laden
 */
fetch('edit_room_modal.html')
  .then(res => res.text())
  .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);

      const modalEl = document.getElementById('editModal');
      const modal = new bootstrap.Modal(modalEl);

      document.getElementById('confirmEditBtn').addEventListener('click', async () => {
          if (typeof editCallback === 'function') {
              await editCallback(document.getElementById('editModalInput').value);
          }
          modal.hide();
          editCallback = null;
      });
  });

/**
 * Funktion, um das Edit-Modal zu öffnen
 * @param {string} title - Titel des Modals
 * @param {string} currentValue - aktueller Wert, der angezeigt werden soll
 * @param {function} callback - Funktion, die beim Speichern ausgeführt wird
 */
export function openEditRoomModal(title, currentValue, callback) {
    const modalEl = document.getElementById('editModal');
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

    document.getElementById('editModalTitle').textContent = title;
    document.getElementById('editModalInput').value = currentValue;

    editCallback = callback;
    modal.show();
}