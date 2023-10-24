import { DniFront } from "@/components/DniFront";
import { api } from "@/utils/api";
import { FormEventHandler, useState } from "react";
import CardFlip from "react-card-flip";

const styles = {
  width: "100%",
  height: "100%",
  borderRadius: "4px",
  backgroundColor: "transparent",
  border: "0.5px solid rgba(0, 0, 0, 0.2)",
  boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.25)",
};

const CreateDni = () => {
  const createDni = api.dni.create.useMutation();
  const [isFlipped, setIsFlipped] = useState(false);
  const [newDni, setDni] = useState({
    document: 45871233,
    photoFace: "dero.png",
    photoSignature: "Firma.png",
    surname: "Daireaux",
    name: "Joaquin",
    sex: "A",
    nationality: "ARGENTINA",
    exemplar: "A",
    birthDate: "24 SET/ SET 2004",
    issueDate: "09 JUN/ JUN 2022",
    expiryDate: "09 JUN/ JUN 2037",
    tramitNumber: 006900326987238,
    codePDF417: "",
    donor: "",

    address: "",
    birthPlace: "",
    cuil: "",
    interiorMinisterName: "",
    photoInteriorMinisterSignature: "",
    photoFingerPrint: "",
    mechanicalReadingArea: "",

    photoBgFront: "arg_front_bg.png",
    photoBgBack: "arg_back_bg.png",
  });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const userCreated = await createDni.mutateAsync(newDni);
    if (userCreated) {
      alert("Nuevo usuario creado");
    }
    (e.target as HTMLFormElement).reset();
  };
  return (
    <div>
      <h2>Create DNI</h2>
      <div className="gap flex">
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="document(8)"
            value={newDni.document}
            onChange={(e) =>
              setDni({ ...newDni, document: parseInt(e.target.value) })
            }
          />

          <input
            placeholder="name"
            value={newDni.name}
            onChange={(e) => setDni({ ...newDni, name: e.target.value })}
          />

          <input
            placeholder="surname"
            value={newDni.surname}
            onChange={(e) => setDni({ ...newDni, surname: e.target.value })}
          />

          <input
            placeholder="sex"
            value={newDni.sex}
            onChange={(e) => setDni({ ...newDni, sex: e.target.value })}
          />

          <input
            placeholder="nationality"
            value={newDni.nationality}
            onChange={(e) => setDni({ ...newDni, nationality: e.target.value })}
          />

          <input
            placeholder="exemplar"
            value={newDni.exemplar}
            onChange={(e) => setDni({ ...newDni, exemplar: e.target.value })}
          />

          <input
            placeholder="address"
            value={newDni.address}
            onChange={(e) => setDni({ ...newDni, address: e.target.value })}
          />

          <input
            placeholder="birthPlace"
            value={newDni.birthPlace}
            onChange={(e) => setDni({ ...newDni, birthPlace: e.target.value })}
          />

          <input
            placeholder="birthDate"
            value={newDni.birthDate}
            onChange={(e) => setDni({ ...newDni, birthDate: e.target.value })}
          />

          <input
            placeholder="issueDate"
            value={newDni.issueDate}
            onChange={(e) => setDni({ ...newDni, issueDate: e.target.value })}
          />

          <input
            placeholder="expiryDate"
            value={newDni.expiryDate}
            onChange={(e) => setDni({ ...newDni, expiryDate: e.target.value })}
          />

          <input
            placeholder="cuil"
            value={newDni.cuil}
            onChange={(e) => setDni({ ...newDni, cuil: e.target.value })}
          />

          <input
            placeholder="interiorMinisterName"
            value={newDni.interiorMinisterName}
            onChange={(e) =>
              setDni({ ...newDni, interiorMinisterName: e.target.value })
            }
          />

          <input
            placeholder="photoInteriorMinisterSignature"
            value={newDni.photoInteriorMinisterSignature}
            onChange={(e) =>
              setDni({
                ...newDni,
                photoInteriorMinisterSignature: e.target.value,
              })
            }
          />

          <input
            placeholder="photoFingerPrint"
            value={newDni.photoFingerPrint}
            onChange={(e) =>
              setDni({ ...newDni, photoFingerPrint: e.target.value })
            }
          />

          <textarea
            style={{ fontFamily: "SourceCodePro" }}
            placeholder="mechanicalReadingArea"
            value={newDni.mechanicalReadingArea}
            cols={30}
            rows={3}
            onChange={(e) =>
              setDni({ ...newDni, mechanicalReadingArea: e.target.value })
            }
          />

          <input
            placeholder="photoBgFront"
            value={newDni.photoBgFront}
            onChange={(e) =>
              setDni({ ...newDni, photoBgFront: e.target.value })
            }
          />

          <input
            placeholder="photoBgBack"
            value={newDni.photoBgBack}
            onChange={(e) => setDni({ ...newDni, photoBgBack: e.target.value })}
          />

          <input
            placeholder="tramitNumber(15)"
            value={newDni.tramitNumber || ""}
            onChange={(e) =>
              setDni({ ...newDni, tramitNumber: parseInt(e.target.value) })
            }
          />

          <input
            placeholder="codePDF417"
            value={newDni.codePDF417}
            onChange={(e) => setDni({ ...newDni, codePDF417: e.target.value })}
          />

          <input
            placeholder="donor"
            value={newDni.donor}
            onChange={(e) => setDni({ ...newDni, donor: e.target.value })}
          />

          <input
            placeholder="photoFace"
            value={newDni.photoFace}
            onChange={(e) => setDni({ ...newDni, photoFace: e.target.value })}
          />

          <input
            placeholder="photoSignature"
            value={newDni.photoSignature}
            onChange={(e) =>
              setDni({ ...newDni, photoSignature: e.target.value })
            }
          />

          <button type="submit" className="btn btn-primary btn-sm">
            Crear
          </button>
        </form>
        <div className="inline-flex" onClick={() => setIsFlipped(!isFlipped)}>
          <CardFlip
            isFlipped={isFlipped}
            containerStyle={{
              width: "calc(26rem * var(--dniSizeMultiplier))",
              height: "calc(16.3rem * var(--dniSizeMultiplier))",
            }}
            cardStyles={{
              front: {
                ...styles,
                backgroundImage: `url(/img/bg/${newDni.photoBgFront})`,
                backgroundSize: "cover",
              },
              back: {
                ...styles,
                backgroundImage: `url(/img/bg/${newDni.photoBgBack})`,
                backgroundSize: "cover",
              },
            }}
            children={[
              <DniFront {...newDni} />,
              <div className="relative h-[180px] w-[300px]">
                <p>Card 2</p>
              </div>,
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateDni;
