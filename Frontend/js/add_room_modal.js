export function initModal(modalId, loadRooms) {
    const addRoomModal = document.getElementById(modalId);

    // Modal zurücksetzen beim Schließen
    addRoomModal.addEventListener('hidden.bs.modal', () => {
        document.getElementById('room_name').value = '';
        const alertEl = document.getElementById('successAlert');
        alertEl.classList.remove('show');
        alertEl.classList.add('d-none');
    });

    // EIN EINZIGER Click-Listener
    document.getElementById('saveroomBtn').addEventListener('click', async () => {
        const roomName = document.getElementById('room_name').value.trim();
        if (!roomName) return;

        try {
            const response = await fetch('/api/rooms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: roomName })
            });

            const alertEl = document.getElementById('successAlert');
            alertEl.classList.remove('d-none');
            alertEl.classList.add('show');

            if (response.ok) {
                // Modal nach 2 Sekunden schließen
                setTimeout(() => {
                    const modal = bootstrap.Modal.getOrCreateInstance(addRoomModal);
                    modal.hide();
                    alertEl.classList.remove('show');
                    alertEl.classList.add('d-none');
                    document.getElementById('room_name').value = '';
                    if (typeof loadRooms === 'function') loadRooms(); // neue Liste laden
                }, 2000);
            } else {
                alert("Fehler beim Speichern!");
                setTimeout(() => {
                    alertEl.classList.remove('show');
                    alertEl.classList.add('d-none');
                }, 2000);
            }
        } catch (err) {
            console.error(err);
            alert("Serverfehler!");
            const alertEl = document.getElementById('successAlert');
            setTimeout(() => {
                alertEl.classList.remove('show');
                alertEl.classList.add('d-none');
            }, 2000);
        }
    });
}
