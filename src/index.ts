window.onload = () => {
    const calendarButtons = document.getElementsByClassName("calendarButton") as HTMLCollectionOf<HTMLButtonElement>;
    const dogDayHandler = new DogDayHandler();
    for (const element of calendarButtons) {
        element.addEventListener("click", (ev: Event) => {
            const target = ev.target as HTMLButtonElement
            const changeDate = target.getAttribute("changeDate")
            if (changeDate === null) {
                alert('oops')
            } else {
                dogDayHandler.changeDate(+changeDate)
            }
        })
    };

    dogDayHandler.renderDate()
};

const allDogs = ["georgie", "miso", "tuckie", "chungus", "big chungas"]
function seedRandom(seed: number): number {
    const x = Math.sin(seed++) * 10000;
    console.log(x - Math.floor(x))
    return x - Math.floor(x);
}

class DogDayHandler {
    static dateElement = document.getElementById("date") as HTMLElement;
    static jDogElement = document.getElementById("jdogs") as HTMLElement;
    static lDogElement = document.getElementById("ldogs") as HTMLElement;

    static today = new Date();
    static dogDay: Date = new Date(DogDayHandler.today.getFullYear(), DogDayHandler.today.getMonth(), DogDayHandler.today.getDate());

    public renderDate() {
        DogDayHandler.dateElement.innerHTML = DogDayHandler.dogDay.toDateString()
        var seed = DogDayHandler.dogDay.getTime()
        const shuffleDogs = [...allDogs].sort((a, b) => .5 - seedRandom(seed++))
        const splitIndex = Math.floor(seedRandom(seed++) * (shuffleDogs.length - 1)) + 1
        const jList = shuffleDogs.slice(0,splitIndex), lList = shuffleDogs.slice(splitIndex)
        DogDayHandler.jDogElement.innerHTML = String(jList)
        DogDayHandler.lDogElement.innerHTML = String(lList)
    }

    public changeDate(dateIncrement: number) {
        DogDayHandler.dogDay.setDate(DogDayHandler.dogDay.getDate() + dateIncrement)
        this.renderDate()
    }
}
