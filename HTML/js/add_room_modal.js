export function initModal(modalId) {
    const addRoomModal = document.getElementById(modalId);

    // Modal resetten beim Öffnen
    addRoomModal.addEventListener('hidden.bs.modal', () => {
        document.getElementById('room_name').value = '';
        const alertEl = document.getElementById('successAlert');
        alertEl.classList.remove('show');
        alertEl.classList.add('d-none');
    });

    // Raum hinzufügen Button
    document.getElementById('saveroomBtn').addEventListener('click', () => {
        const alertEl = document.getElementById('successAlert');
        alertEl.classList.remove('d-none');
        alertEl.classList.add('show');

        // Modal schließen nach 2 Sekunden
        const modal = bootstrap.Modal.getOrCreateInstance(addRoomModal);
        setTimeout(() => modal.hide(), 2000);

        // Alert automatisch nach 2 Sekunden ausblenden
        setTimeout(() => {
            alertEl.classList.remove('show');
            alertEl.classList.add('d-none');
        }, 2000);
    });
}