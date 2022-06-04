// chứa thông tin về 3 tùy chọn
const values = [
    {id: 'scissors', value:'✌️'},
    {id: 'rock', value:'✊'},
    {id: 'paper', value:'🖐'},
]

let i = 0;

// hàm interval cho phép chạy một hàm sau một khoảng thời gian, sau đó lặp lại liên tục trong thời gian đó.
const handleChange = () => {
    const computer = document.getElementById('computer');
    computer.textContent = values[i].value; // đầu tiên gán cho cái kéo
    computer.dataset.id = values[i].id; // data-id đã bằng chính id
    if (i === values.length - 1){
        i = 0;
    } else {
        i++;
    }
}

let interval = setInterval(handleChange, 100);

const compare = (user, computer) => {
    const indexUser = values.findIndex(item => item.id === user);
    const indexComputer = values.findIndex(item => item.id === computer);
    const check = indexUser - indexComputer;

    // if (indexUser - indexComputer === 1 || indexUser - indexComputer === -2) {
    //     return 'bạn đã thắng !';
    // }

    if ([1, -2].includes(check)) { // búa gặp kéo => 2 - 1 = 1, kéo gặp bao => 1 - 3 = -2, bao gặp búa -> 3 - 2 = 1
        return 1;
    } else if ([-1, 2].includes(check)){
        return -1;
    } else {
        return 0;
    }
}

// user click
document.querySelectorAll('.user').forEach(btn => {
    btn.addEventListener('click', (event) => {
        clearInterval(interval);

        event.target.classList.add('active');
        const valueComputer = document.getElementById('computer').dataset.id;
        const valueUser = event.target.id;
        const result = compare(valueUser, valueComputer);
        let message = '';

        const alert = document.createElement('div');
        alert.classList.add('alert', 'text-center');

        if (result === 1){
            message = 'bạn đã thắng';
            alert.classList.add('alert-success');
        } else if (result === - 1){
            message = 'bạn đã thua';
            alert.classList.add('alert-dark');
        } else {
            message = 'bạn đã hòa';
            alert.classList.add('alert-warning');
        }
        alert.textContent = message;
        document.getElementById('notification').appendChild(alert);
        document.getElementById('play-again').classList.remove('d-none');

        // prevent user click
        document.querySelectorAll('.user').forEach(_btn => {
            _btn.style.pointerEvents = 'none';
        })
    })
})

// play again
document.querySelector('.btn-play-again').addEventListener('click', () => {
    // computer start change
    interval = setInterval(handleChange, 100);
    // reset can click
    document.querySelectorAll('.user').forEach(_btn => {
        _btn.style.pointerEvents = '';
    })
    // reset notification
    document.getElementById('notification').innerHTML = '';
    // reset active button
    document.querySelector('.user.active').classList.remove('active');

    // hightlight again button
    document.getElementById('play-again').classList.add('d-none');
})