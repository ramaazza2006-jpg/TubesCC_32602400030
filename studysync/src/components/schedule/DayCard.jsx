import ScheduleItem from "./ScheduleItem";


export default function DayCard({
  title,
  color,
  items,
  deleteSchedule,
  setEditSchedule,
  setIsOpen,
}) {


  return (

    <div
      className={`
        ${color}
        rounded-3xl
        p-5
        min-h-[300px]
        border
        border-slate-200
        shadow-sm
        transition
        hover:shadow-md
      `}
    >


      {/* Nama Hari */}

      <div className="mb-5">

        <h2
          className="
          text-2xl
          font-bold
          text-slate-700
          "
        >
          {title}
        </h2>

      </div>





      {/* Jika kosong */}

      {
        items.length === 0 ? (


          <div
            className="
              bg-white
              rounded-2xl
              p-8
              text-center
              border
              border-slate-200
              text-slate-400
            "
          >

            Belum ada jadwal


          </div>



        ) : (



          <div className="space-y-4">


            {
              items.map((item)=>(


                <ScheduleItem

                  key={item.id}

                  schedule={item}

                  deleteSchedule={deleteSchedule}

                  setEditSchedule={setEditSchedule}

                  setIsOpen={setIsOpen}

                />


              ))
            }


          </div>



        )
      }



    </div>


  );

}