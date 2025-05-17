import { useState } from 'react'
import { PaiContainer, Title, Content, Container, Primeiro, Third, For, First, Segundo, Terceiro, Second, MarkContainer, TitleMark, MarkExternal, CardDefault } from './style'
import uploadImage from '../../assets/UploadSimple.svg'
import IconClose from '../../assets/Close.svg'

export function Product() {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState<string>();
  const [ingredientes, setIngredientes] = useState<string>();
  const [listaDeMarcadores, setListaDeMarcadores] = useState(["Pão Naan"]);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
  const [price, setPrice] = useState<string>();

  function deleteMark(index) {
    const lista = [...listaDeMarcadores];
    lista.splice(index, 1);
    setListaDeMarcadores(lista);
  }

  interface HandleImageEvent extends React.ChangeEvent<HTMLInputElement> { }

  function handleImage(e: HandleImageEvent): void {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  }

  function HandleSubmit() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("valpriceor", price);
    formData.append("description", description);
    formData.append("ingredientes", JSON.stringify(listaDeMarcadores));

    formData.append("image", image);

    api
      .post("/produtos/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Produto criado com sucesso!");
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao criar o produto");
      });
  }


  return (
    <>
      <PaiContainer>
        <Container>
          <Title>Adicionar prato</Title>
          <Content>
            <First>
              <Primeiro>
                <label id="select_image">
                  Imagem do prato
                  <div>
                    <img src={uploadImage} alt="" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                    />
                  </div>
                </label>
              </Primeiro>
              <Segundo>
                <label id="declare_name">
                  Nome
                  <div>
                    <input
                      type="text"
                      placeholder="Ex.: Salada Ceasar"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </label>
              </Segundo>
            </First>

            <Second>
              <MarkContainer>
                <TitleMark>Ingredientes</TitleMark>
                <MarkExternal>
                  {listaDeMarcadores.map((mark, index) => (
                    <CardDefault key={index}>
                      <p>{mark}</p>
                      <img
                        onClick={() => deleteMark(index)}
                        src={IconClose}
                        alt=""
                      />
                    </CardDefault>
                  ))}
                  {/* <Marcacoes setListaDeMarcadores={setListaDeMarcadores} /> */}
                </MarkExternal>
              </MarkContainer>
              <label id="valor_select">
                <p>Preço</p>
                <div>
                  <input type="number" placeholder="R$ 00,00" onChange={(e) => setPrice(e.target.value)} />
                </div>
              </label>
            </Second>
            <Third>
              <label id="valor_select">
                <p>Descrição</p>
                <div>
                  <textarea
                    placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                    cols="1000"
                    rows="13"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </label>
              <For>
                <button type="button" onClick={HandleSubmit}>
                  Salvar alterações
                </button>
              </For>
            </Third>
          </Content>
        </Container>
      </PaiContainer>
    </>
  )
}
