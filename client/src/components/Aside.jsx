import "../css/index.css";
import { Disclosure, Dialog, Transition } from "@headlessui/react";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { Fragment, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { showError } from "../general";
import { useTranslation } from "react-i18next";

export default function Aside() {
  //variables
  const { cities, filterPosts } = useContext(AuthContext);
  const { t } = useTranslation();

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minKM: "",
    maxKM: "",
    mark: "",
    model: "",
    since: "",
    to: "",
    doors: "",
    motor: "",
    location: "",
    color: "",
    bodywork: "",
    fuel: "",
  });

  const [openMobile, setOpenMobile] = useState(false);

  /**
   * 
   * @param {object} filters 
   * @returns filters data
   */
  const buildParams = (filters) =>
    Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) => value !== "" && value !== null && value !== undefined && value.toString().trim() !== ""
      )
    );

  /**
   * Function to get the information of form and fetch to get the information
   * @param {event} e Event of Form 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    let params = new URLSearchParams(buildParams(filters));
    let response = await filterPosts(params);
    if (!response.ok) showError(response.status);

    setOpenMobile(false);
  };

  return (
    <>

      <div className="md:hidden fixed top-48 mt-2 right-4 z-50">
        <button
          onClick={() => setOpenMobile(true)}
          aria-expanded={openMobile}
          aria-controls="mobile-filter-dialog"
          aria-label={t("openFilters")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-full shadow-lg"
        >
          <FunnelIcon className="w-5 h-5" aria-hidden="true" aria-label={t("close")}/>
          {t("filtres")}
        </button>
      </div>

      {/* Mobile part */}
      <Transition appear show={openMobile} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setOpenMobile(false)}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="transition-transform duration-200"
                enterFrom="translate-y-4 opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="transition-transform duration-200"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="translate-y-4 opacity-0"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-card-bg dark:bg-gray-800 p-6 text-left shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-bold text-color mb-4">{t("filtres")}</Dialog.Title>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Price */}
                    <div>
                      <label className="text-color text-sm"> {t("minPrice")} </label>
                      <input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                        className="border border-gray-300 dark:border-gray-500 rounded-md p-2 w-full text-black dark:text-black"
                        placeholder={t("minPrice")}
                      />
                      <label className="text-color text-sm mt-1"> {t("maxPrice")} </label>
                      <input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                        className="border border-gray-300 dark:border-gray-500 rounded-md p-2 w-full text-black dark:text-black"
                        placeholder={t("maxPrice")}
                      />
                    </div>

                    {/* KM */}
                    <div>
                      <label className="text-color text-sm">{t("minKM")}</label>
                      <input
                        type="number"
                        value={filters.minKM}
                        onChange={(e) => setFilters({ ...filters, minKM: e.target.value })}
                        className="border border-gray-300 dark:border-gray-500 rounded-md p-2 w-full text-black dark:text-black"
                        placeholder={t("minKM")}
                      />
                      <label className="text-color text-sm mt-1">{t("maxKM")}</label>
                      <input
                        type="number"
                        value={filters.maxKM}
                        onChange={(e) => setFilters({ ...filters, maxKM: e.target.value })}
                        className="border border-gray-300 dark:border-gray-500 rounded-md p-2 w-full text-black dark:text-black"
                        placeholder={t("maxKM")}
                      />
                    </div>

                    {/* Otros filtros */}
                    <div className="flex flex-col gap-2">
                      <label className="text-color text-sm">{t("mark")}</label>
                      <input
                        type="text"
                        value={filters.mark}
                        onChange={(e) => setFilters({ ...filters, mark: e.target.value })}
                        className="border border-gray-300 dark:border-gray-500 rounded-md p-2 w-full text-black dark:text-black"
                        placeholder={t("mark")}
                      />
                      <label className="text-color text-sm">{t("model")}</label>
                      <input
                        type="text"
                        value={filters.model}
                        onChange={(e) => setFilters({ ...filters, model: e.target.value })}
                        className="border border-gray-300 dark:border-gray-500 rounded-md p-2 w-full text-black dark:text-black"
                        placeholder={t("model")}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="">{t("city")}</label>
                      <select className="text-black"
                        value={filters.location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}>
                        <option value="">{t("city")}</option>
                        {cities.map((c, i) => <option key={i}>{c.city}</option>)}
                      </select>
                    </div>

                    {/* Botón enviar */}
                    <button
                      type="submit"
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded-md"
                    
                   >
                      {t("sendFilter")}
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>

            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Sidebar desktop */}
      <div className="hidden md:block w-64">
        <form onSubmit={handleSubmit} role="search" aria-labelledby="filter-title">
          {/* PRICE */}
          <Disclosure as="div" className="w-full border border-gray-800 p-0">
            <Disclosure.Button className="flex w-full justify-center items-center font-medium focus:outline-none  hover:border-gray-800 cursor-default rounded-none" aria-expanded={open}>
              <h1 className="text-xl font-bold text-color">{t("filtres")}</h1>
            </Disclosure.Button>
          </Disclosure>
          <Disclosure as="div" className="w-full border border-gray-800 p-0">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none text-color"  aria-expanded={open}>
                  {t("price")}
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""
                      }`}
                       aria-hidden="true"
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                  <div className="flex w-full gap-2 text-black items-center">
                    <div className="flex flex-col items-center ">
                      <label htmlFor="minPrice">{t("minPrice")}:</label>
                      <input
                        type="number"
                        name="minPrice"
                        id="minPrice"
                        placeholder={t("minPrice")}
                        min="0"
                        max="99999999"
                        maxLength="8"
                        step="0.01"
                        value={filters.minPrice}
                        onChange={(e) =>
                          setFilters({ ...filters, minPrice: e.target.value })
                        }
                        className="border border-gray-300 w-3/4 rounded-md p-2 text-black"
                      />
                    </div>
                    <div className="flex flex-col items-center ">
                      <label htmlFor="maxPrice">{t("maxPrice")}:</label>
                      <input
                        type="number"
                        placeholder={t("maxPrice")}
                        name="maxPrice"
                        id="maxPrice"
                        min="0"
                        max="99999999"
                        maxLength="8"
                        step="0.01"
                        value={filters.maxPrice}
                        onChange={(e) =>
                          setFilters({ ...filters, maxPrice: e.target.value })
                        }
                        className="border border-gray-300 w-3/4 rounded-md p-2 text-black"
                      />
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* KM */}
          <Disclosure as="div" className="w-full border border-gray-800 p-0 ">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none text-color" aria-expanded={open}>
                  {t("km")}
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""
                      }`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                  <div className="flex w-full gap-2 items-center text-black">
                    <div className="flex flex-col items-center text-center">
                      <label htmlFor="minKM">{t("minKM")}:</label>
                      <input
                        type="number"
                        placeholder={t("minKM")}
                        name="minKM"
                        id="minKM"
                        min="0"
                        max="999999"
                        maxLength="6"
                        value={filters.minKM}
                        onChange={(e) =>
                          setFilters({ ...filters, minKM: e.target.value })
                        }
                        className="border border-gray-300 w-3/4 rounded-md p-2 text-black"
                      />
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <label htmlFor="maxKM">{t("maxKM")}:</label>
                      <input
                        type="number"
                        placeholder={t("maxKM")}
                        name="maxKM"
                        id="maxKM"
                        min="0"
                        max="999999"
                        maxLength="6"
                        value={filters.maxKM}
                        onChange={(e) =>
                          setFilters({ ...filters, maxKM: e.target.value })
                        }
                        className="border border-gray-300 w-3/4 rounded-md p-2 text-black"
                      />
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* Mark*/}
          <Disclosure as="div" className="w-full border border-gray-800 p-0">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none text-color" aria-expanded={open}>
                  {t("mark")}
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""
                      }`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                  <div className="flex flex-col w-full justify-center gap-2 text-black">
                    <label htmlFor="mark">{t("mark")}:</label>
                    <input
                      type="text"
                      placeholder={t("mark")}
                      name="mark"
                      id="mark"
                      value={filters.mark}
                      maxLength="100"
                      pattern="[A-Za-z0-9\s\-]{2,}"
                      onChange={(e) =>
                        setFilters({ ...filters, mark: e.target.value })
                      }
                      className="border w-3/4 border-gray-300 rounded-md p-2 text-black"
                    />
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* Model*/}
          <Disclosure as="div" className="w-full border border-gray-800 p-0">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none text-color" aria-expanded={open}>
                  {t("model")}
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""
                      }`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                  <div className="flex flex-col w-full justify-center gap-2 text-black">
                    <label htmlFor="model">{t("model")}:</label>
                    <input
                      type="text"
                      placeholder={t("model")}
                      id="model"
                      name="model"
                      maxLength="100"
                      pattern="[A-Za-z0-9\s\-]{1,}"
                      value={filters.model}
                      onChange={(e) =>
                        setFilters({ ...filters, model: e.target.value })
                      }
                      className="border w-3/4 border-gray-300 rounded-md p-2 text-black"
                    />
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          {/* Year*/}
          <Disclosure as="div" className="w-full border border-gray-800 p-0">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none text-color" aria-expanded={open}>
                  {t("year")}
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""
                      }`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                  <div className="flex w-full justify-between gap-2 text-black">
                    <div className="flex flex-col items-center">
                      <label htmlFor="since">{t("since")}:</label>
                      <input
                        type="number"
                        placeholder={t("since")}
                        id="since"
                        name="since"
                        min="1980"
                        value={filters.since}
                        max={new Date().getFullYear()}
                        onChange={(e) =>
                          setFilters({ ...filters, since: e.target.value })
                        }
                        className="border w-3/4 border-gray-300 rounded-md p-2 text-black"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label htmlFor="to">{t("to")}:</label>
                      <input
                        type="number"
                        placeholder={t("to")}
                        id="to"
                        name="to"
                        min="1980"
                        value={filters.to}
                        max={new Date().getFullYear()}
                        onChange={(e) =>
                          setFilters({ ...filters, to: e.target.value })
                        }
                        className="border w-3/4 border-gray-300 rounded-md p-2 text-black"
                      />
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          {/* Doors*/}
          <Disclosure as="div" className="w-full border border-gray-800 p-0">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none text-color" aria-expanded={open}>
                  {t("doors")}
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""
                      }`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                  <div className="flex flex-col w-full justify-center gap-2 text-black">
                    <label htmlFor="doors">{t("numDoors")}:</label>
                    <input
                      type="number"
                      placeholder={t("numDoors")}
                      id="doors"
                      name="doors"
                      min="2"
                      max="5"
                      value={filters.doors}
                      onChange={(e) =>
                        setFilters({ ...filters, doors: e.target.value })
                      }
                      className="border w-3/4 border-gray-300 rounded-md p-2 text-black"
                    />
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          {/*Motor */}
          <Disclosure as="div" className="w-full border border-gray-800 p-0">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none text-color" aria-expanded={open}>
                  {t("motor")}
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""
                      }`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                  <div className="flex flex-col w-full justify-center gap-2 text-black">
                    <label htmlFor="motor">{t("motor")}:</label>
                    <select
                      name="motor"
                      id="motor"
                      value={filters.motor}
                      onChange={(e) =>
                        setFilters({ ...filters, motor: e.target.value })
                      }
                      className="border w-3/4 border-gray-300 rounded-md p-2 text-black"
                    >
                      <option value="">{t("select")}</option>
                      <option value="manual">{t("manual")}</option>
                      <option value="automatic">{t("automatic")}</option>
                    </select>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          {/*Location */}
          <Disclosure as="div" className="w-full border border-gray-800 p-0">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none text-color" aria-expanded={open}>
                  {t("location")}
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""
                      }`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                  <div className="flex flex-col w-full justify-center gap-2 text-black">
                    <label htmlFor="location">{t("city")}:</label>
                    <select
                      name="location"
                      id="location"
                      value={filters.location}
                      onChange={(e) =>
                        setFilters({ ...filters, location: e.target.value })
                      }
                      className="border w-3/4 border-gray-300 rounded-md p-2 text-black"
                    >
                      <option value="">{t("select")}</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city.city}>
                          {city.city}
                        </option>
                      ))}
                    </select>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/*Color */}
          <Disclosure as="div" className="w-full border border-gray-800 p-0">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none text-color" aria-expanded={open}>
                  Color
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""
                      }`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                  <div className="flex flex-col w-full justify-center gap-2 text-black">
                    <label htmlFor="color">{t("color")}:</label>
                    <select
                      name="color"
                      id="color"
                      value={filters.color}
                      onChange={(e) =>
                        setFilters({ ...filters, color: e.target.value })
                      }
                      className="border w-3/4 border-gray-300 rounded-md p-2 text-black"
                    >
                      <option value="">{t("select")}</option>
                      <option value="Red">{t("red")}</option>
                      <option value="Blue">{t("blue")}</option>
                      <option value="White">{t("white")}</option>
                      <option value="Black">{t("black")}</option>
                      <option value="Orange">{t("orange")}</option>
                      <option value="Pink">{t("pink")}</option>
                      <option value="Yellow">{t("yellow")}</option>
                      <option value="Purple">{t("purple")}</option>
                      <option value="Gray">{t("gray")}</option>
                      <option value="Brown">{t("brown")}</option>
                    </select>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/*Bodywork */}
          <Disclosure as="div" className="w-full border border-gray-800 p-0">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none text-color" aria-expanded={open}>
                  {t("bodywork")}
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""
                      }`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                  <div className="flex flex-col w-full justify-center gap-2 text-black">
                    <label htmlFor="bodywork">Bodywork:</label>
                    <select
                      name="bodywork"
                      id="bodywork"
                      value={filters.bodywork}
                      onChange={(e) =>
                        setFilters({ ...filters, bodywork: e.target.value })
                      }
                      className="border w-3/4 border-gray-300 rounded-md p-2 text-black"
                    >
                      <option value="">{t("select")}</option>
                      <option value="Berlina">Berlina</option>
                      <option value="Familiar">Familiar</option>
                      <option value="Coupe">Coupe</option>
                      <option value="Monovolume">Monovolume</option>
                      <option value="SUV">SUV</option>
                      <option value="Cabrio">Cabrio</option>
                      <option value="PickUp">Pick Up</option>
                    </select>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          {/*fuel */}
          <Disclosure as="div" className="w-full border border-gray-800 p-0">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none text-color" aria-expanded={open}>
                  {t("fuel")}
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""
                      }`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                  <div className="flex flex-col w-full justify-center gap-2 text-black">
                    <label htmlFor="fuel">{t("fuel")}:</label>
                    <select
                      name="fuel"
                      id="fuel"
                      value={filters.fuel}
                      onChange={(e) =>
                        setFilters({ ...filters, fuel: e.target.value })
                      }
                      className="border w-3/4 border-gray-300 rounded-md p-2 text-white"
                    >
                      <option value="">Select one...</option>
                      <option value="Disel">{t("disel")}</option>
                      <option value="Gasoline">{t("gasoline")}</option>
                      <option value="Electric">{t("electric")}</option>
                      <option value="Hybrid">{t("hybrid")}</option>
                    </select>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/*Send button */}
          <Disclosure as="div" className="w-full border border-gray-800 p-0">
            <Disclosure.Button
              type="submit"
              className="w-full bg-gray-500 rounded-none text-color"
              
            >
              {t("sendFilter")}
            </Disclosure.Button>
          </Disclosure>
        </form>
      </div>
    </>
  );
}
