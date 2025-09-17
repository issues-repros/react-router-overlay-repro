import { createContext, StrictMode, useContext } from "react"
import { createRoot } from "react-dom/client"
import { overlay, OverlayProvider } from "overlay-kit"
import { createBrowserRouter, RouterProvider, useParams } from "react-router"
import { Button, Drawer } from "antd"

const Params = () => {
  const params = useParams()
  const context = useContext(NumberContext)

  return (
    <section>
      <h3>params:</h3>
      <pre>{JSON.stringify({ params, context }, null, 2)}</pre>
    </section>
  )
}

const router = createBrowserRouter([
  {
    path: ":id",
    Component: () => (
      <div>
        <h1>:id</h1>
        <Params />
        <Button
          type="primary"
          onClick={() =>
            overlay.open(({ isOpen, close }) => (
              <Drawer title="Basic Drawer" open={isOpen} onClose={close}>
                <Params />
              </Drawer>
            ))}
        >
          Open Drawer
        </Button>
      </div>
    ),
  },
])

const NumberContext = createContext({ number: 1234 })

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NumberContext.Provider value={{ number: 42 }}>
      <OverlayProvider>
        <RouterProvider router={router} />
      </OverlayProvider>
    </NumberContext.Provider>
  </StrictMode>,
)
