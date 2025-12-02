export async function initModal(modalId, loadDevices) {
    const modalEl = document.getElementById(modalId);

    const roomDropdownBtn = document.getElementById('dropdownMenuButton_room');
    const roomDropdownMenu = roomDropdownBtn.nextElementSibling;

    const typeDropdownBtn = document.getElementById('dropdownMenuButton_type');
    const typeDropdownMenu = typeDropdownBtn.nextElementSibling;

    const deviceNameInput = document.getElementById('device_name');
    const saveBtn = document.getElementById('saveDeviceBtn');
    const alertEl = document.getElementById('successAlert');

    let selectedRoomId = null;
    let selectedTypeId = null;

    modalEl.addEventListener('hidden.bs.modal', () => {
        deviceNameInput.value = '';
        selectedRoomId = null;
        selectedTypeId = null;
        roomDropdownBtn.textContent = 'Raum auswählen';
        typeDropdownBtn.textContent = 'Geräteart auswählen';
        alertEl.classList.remove('show');
        alertEl.classList.add('d-none');
    });

    const roomsRes = await fetch('/api/rooms');
    const rooms = await roomsRes.json();
    roomDropdownMenu.innerHTML = '';
    rooms.forEach(room => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('dropdown-item');
        a.href = '#';
        a.textContent = room.name;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            selectedRoomId = room.room_id;
            roomDropdownBtn.textContent = room.name;
        });
        li.appendChild(a);
        roomDropdownMenu.appendChild(li);
    });

    const typesRes = await fetch('/api/device_types');
    const types = await typesRes.json();
    typeDropdownMenu.innerHTML = '';
    types.forEach(type => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('dropdown-item');
        a.href = '#';
        a.textContent = type.name;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            selectedTypeId = type.device_type_id;
            typeDropdownBtn.textContent = type.name;
        });
        li.appendChild(a);
        typeDropdownMenu.appendChild(li);
    });

    saveBtn.addEventListener('click', async () => {
        const name = deviceNameInput.value.trim();
        if (!name || !selectedRoomId || !selectedTypeId) {
            alert('Bitte alle Felder ausfüllen!');
            return;
        }

        try {
            const res = await fetch('/api/devices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    room_id: selectedRoomId,
                    device_type_id: selectedTypeId,
                    value: ""
                })
            });

            if (res.ok) {
                alertEl.classList.remove('d-none');
                alertEl.classList.add('show');

                setTimeout(() => {
                    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                    modal.hide();
                    alertEl.classList.remove('show');
                    alertEl.classList.add('d-none');
                    deviceNameInput.value = '';
                    selectedRoomId = null;
                    selectedTypeId = null;
                    roomDropdownBtn.textContent = 'Raum auswählen';
                    typeDropdownBtn.textContent = 'Geräteart auswählen';
                    if (typeof loadDevices === 'function') loadDevices();
                }, 2000);
            } else {
                alert('Fehler beim Speichern!');
            }
        } catch (err) {
            console.error(err);
            alert('Serverfehler!');
        }
    });
}