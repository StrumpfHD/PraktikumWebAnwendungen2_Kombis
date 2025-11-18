export function initModal(modalId) {
    const addDeviceModal = document.getElementById(modalId);

    // Modal resetten beim Öffnen
    addDeviceModal.addEventListener('hidden.bs.modal', () => {
        document.getElementById('device_name').value = '';
        document.getElementById('dropdownMenuButton_room').textContent = 'Raum auswählen';
        document.getElementById('dropdownMenuButton_type').textContent = 'Geräteart auswählen';
        const alertEl = document.getElementById('successAlert');
        alertEl.classList.remove('show');
        alertEl.classList.add('d-none');
    });

    // Gerät hinzufügen Button
    document.getElementById('saveDeviceBtn').addEventListener('click', () => {
        const alertEl = document.getElementById('successAlert');
        alertEl.classList.remove('d-none');
        alertEl.classList.add('show');

        // Modal schließen nach 2 Sekunden
        const modal = bootstrap.Modal.getInstance(addDeviceModal);
        setTimeout(() => modal.hide(), 2000);

        // Alert automatisch nach 2 Sekunden ausblenden
        setTimeout(() => {
            alertEl.classList.remove('show');
            alertEl.classList.add('d-none');
        }, 2000);
    });
}

// Dropdown-Auswahl übernehmen
export function initDropdowns() {
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', event => {
            const button = event.target.closest('.dropdown').querySelector('.dropdown-toggle');
            button.textContent = event.target.textContent;
        });
    });
}